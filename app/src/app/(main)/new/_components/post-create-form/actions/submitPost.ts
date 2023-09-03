'use server';

import { createId } from '@paralleldrive/cuid2';
import { z } from 'zod';

import { getUserMetadata } from '../../../../../_libs/auth/server/get-user-metadata';
import { env } from '../../../../../_libs/env';
import { storage } from '../../../../../_libs/storage';
import { insertImage } from '../../../../_repositories/image-repository';
import { insertPost } from '../../../../_repositories/post-repository';
import { findUserProviderByTypeAndSub } from '../../../../_repositories/user-provider-repository';
import { findUserById } from '../../../../_repositories/user-repository';

import type { Route } from 'next';

const inputSchema = z.object({
  image: z.custom<Blob>(value => value instanceof Blob),
  imageWidth: z.coerce.number().positive(),
  imageHeight: z.coerce.number().positive(),
  word: z.string()
    .regex(/^[a-zA-Z]+$/, { message: 'Must be a alphabetic.' })
    .max(16, { message: 'Must be less than 16 characters.' })
    .transform((word) => `${word[0]?.toUpperCase()}${word.slice(1).toLowerCase()}`),
});

export type SubmitPostResult = {
  type: 'success';
  message: string;
  redirectUrl: Route<`/@${string}/posts/${string}`>;
} | {
  type: 'error';
  reason: 'unauthorized' | 'unknown';
  message: string;
};

export const submitPost = async (formData: FormData): Promise<SubmitPostResult> => {
  try {
    const userMetadata = await getUserMetadata();
    if (!userMetadata) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

    const userProvider = await findUserProviderByTypeAndSub(userMetadata.provider, userMetadata.sub);
    if (!userProvider) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

    const user = await findUserById(userProvider.userId);
    if (!user) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

    const input = inputSchema.parse({
      image: formData.get('image'),
      imageWidth: formData.get('image-width'),
      imageHeight: formData.get('image-height'),
      word: formData.get('word'),
    });

    const image = await insertImage({
      id: createId(),
      userId: user.id,
      width: input.imageWidth,
      height: input.imageHeight,
    });

    await storage().put(`users/${user.id}/images/${image.id}`, await input.image.arrayBuffer());

    const post = await insertPost({
      id: createId(),
      userId: user.id,
      imageId: image.id,
      word: input.word,
    });

    // Pre-cache the posted images.
    await fetch(`${env().NEXT_PUBLIC_APP_ORIGIN}/images/posts/${post.id}`);

    return { type: 'success', message: 'Post created!', redirectUrl: `/@${user.profile.name}/posts/${post.id}` };
  } catch (error) {
    console.error(error);
    return { type: 'error', reason: 'unknown', message: 'Post creation failed!' };
  }
};

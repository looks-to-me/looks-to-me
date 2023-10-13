'use server';

import { createId } from '@paralleldrive/cuid2';
import { z } from 'zod';

import { getUserMetadata } from '../../../../../_libs/auth/server/get-user-metadata';
import { env } from '../../../../../_libs/env';
import { storage } from '../../../../../_libs/storage';
import { deleteImage, insertImage } from '../../../../_repositories/image-repository';
import { deletePost, insertPost } from '../../../../_repositories/post-repository';
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

    const postId = createId();
    const imageId = createId();
    const imageKey = `users/${user.id}/images/${imageId}`;

    try {
      // TODO: Need to make sure that the CloudflareImageResizing limit is not exceeded.
      // @see: https://developers.cloudflare.com/images/image-resizing/format-limitations/#format-limitations
      await storage().put(imageKey, await input.image.arrayBuffer());

      const image = await insertImage({
        id: imageId,
        userId: user.id,
        width: input.imageWidth,
        height: input.imageHeight,
      });

      const post = await insertPost({
        id: postId,
        userId: user.id,
        imageId: image.id,
        word: input.word,
      });

      // TODO: If the request fails, make it retry.
      const results = await Promise.all([
        fetch(`${env().NEXT_PUBLIC_APP_ORIGIN}/images/posts/${post.id}`),
        fetch(`${env().NEXT_PUBLIC_APP_ORIGIN}/images/posts/${post.id}`, { headers: { 'accept': 'image/webp' } }),
      ]);

      for (const result of results) {
        if (!result.ok) throw new Error(await result.text());
      }

      return { type: 'success', message: 'Post created!', redirectUrl: `/@${user.profile.name}/posts/${post.id}` };
    } catch (error) {
      console.error(error);

      await deleteImage(imageId);
      await deletePost(postId);
      await storage().delete(imageKey);
      return { type: 'error', reason: 'unknown', message: 'Post creation failed!' };
    }
  } catch (error) {
    console.error(error);
    return { type: 'error', reason: 'unknown', message: 'Post creation failed!' };
  }
};

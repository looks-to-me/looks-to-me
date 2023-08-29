'use server';

import { createId } from '@paralleldrive/cuid2';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { getUserMetadata } from '../../../../../_libs/auth/server/get-user-metadata';
import { db } from '../../../../../_libs/db';
import { schema } from '../../../../../_libs/db/schema';
import { storage } from '../../../../../_libs/storage';

const fetchUserId = async (): Promise<string | undefined> => {
  const userMetadata = await getUserMetadata();
  if (!userMetadata) return;

  const userProvider = await db()
    .select()
    .from(schema.userProviders)
    .where(
      and(
        eq(schema.userProviders.provider, userMetadata.provider),
        eq(schema.userProviders.sub, userMetadata.sub),
      ),
    )
    .get();

  return userProvider?.userId;
};

const uploadImage = async (userId: string, image: Blob): Promise<string> => {
  const imageId = createId();
  await storage().put(`users/${userId}/images/${imageId}`, await image.arrayBuffer());
  return imageId;
};

const insertPost = async (userId: string, imageId: string, word: string): Promise<void> => {
  const postId = createId();

  // TODO: Make use of transaction or batch.
  // @see: https://github.com/drizzle-team/drizzle-orm/issues/758
  {
    await db()
      .insert(schema.images)
      .values({
        id: imageId,
        userId: userId,
        uploadedAt: new Date(),
      })
      .run();

    await db()
      .insert(schema.posts)
      .values({
        id: postId,
        userId: userId,
        imageId: imageId,
        word: word,
        postedAt: new Date(),
      })
      .run();
  }
};

const inputSchema = z.object({
  image: z.custom<Blob>(value => value instanceof Blob),
  word: z.string()
    .regex(/^[a-zA-Z]+$/, { message: 'Must be a alphabetic.' })
    .max(32, { message: 'Must be less than 32 characters.' })
    .transform((word) => `${word[0]?.toUpperCase()}${word.slice(1).toLowerCase()}`),
});

export type SubmitPostResult = {
  type: 'success';
  message: string;
} | {
  type: 'error';
  reason: 'unauthorized' | 'unknown';
  message: string;
};

export const submitPost = async (formData: FormData): Promise<SubmitPostResult> => {
  try {
    const userId = await fetchUserId();
    if (!userId) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

    const input = inputSchema.parse({
      image: formData.get('image'),
      word: formData.get('word'),
    });

    const imageId = await uploadImage(userId, input.image);
    await insertPost(userId, imageId, input.word);

    return { type: 'success', message: 'Post created!' };
  } catch (error) {
    console.error(error);
    return { type: 'error', reason: 'unknown', message: 'Post creation failed!' };
  }
};

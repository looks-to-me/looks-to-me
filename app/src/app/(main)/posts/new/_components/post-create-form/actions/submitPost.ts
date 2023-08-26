'use server';

import { createId } from '@paralleldrive/cuid2';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { getUserMetadata } from '../../../../../../_libs/auth/server/get-user-metadata';
import { db } from '../../../../../../_libs/db';
import { schema } from '../../../../../../_libs/db/schema';
import { storage } from '../../../../../../_libs/storage';

class SubmitPostError extends Error {
  public override readonly name = 'SubmitPostError';

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

const inputSchema = z.object({
  image: z.custom<Blob>(value => value instanceof Blob),
  word: z.string()
    .regex(/^[a-zA-Z]+$/, { message: 'Must be a alphabetic.' })
    .max(32, { message: 'Must be less than 32 characters.' })
    .transform((word) => `${word[0]?.toUpperCase()}${word.slice(1).toLowerCase()}`),
});

export const submitPost = async (formData: FormData): Promise<void> => {
  const input = inputSchema.parse({
    image: formData.get('image'),
    word: formData.get('word'),
  });

  const userMetadata = await getUserMetadata();
  if (!userMetadata) throw new SubmitPostError('Unauthorized');

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
  if (!userProvider) throw new SubmitPostError('Unauthorized');

  const imageId = createId();
  await storage().put(`users/${userProvider.userId}/images/${imageId}`, await input.image.arrayBuffer());

  const postId = createId();

  // TODO: Make use of transaction or batch.
  // @see: https://github.com/drizzle-team/drizzle-orm/issues/758
  {
    await db()
      .insert(schema.images)
      .values({
        id: imageId,
        userId: userProvider.userId,
        uploadedAt: new Date(),
      })
      .run();

    await db()
      .insert(schema.posts)
      .values({
        id: postId,
        userId: userProvider.userId,
        imageId: imageId,
        word: input.word,
        postedAt: new Date(),
      })
      .run();
  }
};

'use server';

import { eq } from 'drizzle-orm';

import { db } from '../../_libs/db';
import { schema } from '../../_libs/db/schema';

export type Image = {
  id: string;
  userId: string;
  width: number;
  height: number;
};

export const insertImage = async (image: Image): Promise<Image> => {
  await db()
    .insert(schema.images)
    .values({
      id: image.id,
      userId: image.userId,
      width: image.width,
      height: image.height,
      uploadedAt: new Date(),
    })
    .run();

  return image;
};

export const findImageById = async (id: Image['id']): Promise<Image | undefined> => {
  return await db()
    .select({
      id: schema.images.id,
      userId: schema.images.userId,
      width: schema.images.width,
      height: schema.images.height,
    })
    .from(schema.images)
    .where(eq(schema.images.id, id))
    .get();
};

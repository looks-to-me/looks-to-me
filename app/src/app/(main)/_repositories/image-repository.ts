'use server';

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

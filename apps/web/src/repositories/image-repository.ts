'use server';

import { schema } from '@looks-to-me/package-database';
import { eq, sql } from 'drizzle-orm';

import { database } from '../app/_libs/database';

export type Image = {
  id: string;
  userId: string;
  width: number;
  height: number;
};

export const deleteImage = async (id: Image['id']): Promise<void> => {
  await database()
    .delete(schema.images)
    .where(eq(schema.images.id, id));
};

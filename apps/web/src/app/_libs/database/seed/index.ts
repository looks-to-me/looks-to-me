import fs from 'node:fs/promises';
import path from 'node:path';

import { createSeedImage, createSeedPost, createSeedUser } from './factory';
import 'dotenv/config';
import { cleanupWorker, setupWorker } from './setup-worker';
import { database } from '..';
import { privateEnv } from '../../env';
import { schema } from '../schema';

const createSeed = async () => {
  const existUser = await database().select().from(schema.users).limit(1).get();
  if (existUser) {
    console.log('✅ Seed data already created, skipping seed creation.');
    return;
  }

  const [user1] = await createSeedUser();
  const [user2] = await createSeedUser();
  const image = await createSeedImage({ userId: user2.id });

  const postCount = 20;
  const postingUser1Promise = Array.from({ length: postCount })
    .fill(null)
    .map(() => createSeedPost({ userId: user1.id, imageId: image.id }));
  const user1Posts = await Promise.all(postingUser1Promise);

  const postingUser2Promise = Array.from({ length: postCount })
    .fill(null)
    .map(() => createSeedPost({ userId: user2.id, imageId: image.id }));
  const user2Posts = await Promise.all(postingUser2Promise);

  const r2 = privateEnv().BUCKET;
  const imageFile = await fs.readFile(
    path.join(
      // eslint-disable-next-line unicorn/prefer-module
      __dirname,
      './../../../../../public/looks-to-me-with-text-black.png',
    ),
  );
  await Promise.all([
    ...user2Posts.map((post) =>
      r2.put(`users/${post.userId}/images/${post.imageId}`, imageFile.buffer, {
        httpMetadata: {
          contentType: 'image/png',
        },
      }),
    ),
    ...user1Posts.map((post) =>
      r2.put(`users/${post.userId}/images/${post.imageId}`, imageFile.buffer, {
        httpMetadata: {
          contentType: 'image/png',
        },
      }),
    ),
  ]);

  console.log('✅ Seed data creation complete.');
};

const main = async () => {
  await setupWorker();
  await createSeed();
  await cleanupWorker();
};

void main();

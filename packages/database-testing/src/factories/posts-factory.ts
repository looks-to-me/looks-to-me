import { database } from '@looks-to-me/package-database';
import { defineFactory } from '@praha/drizzle-factory';

import { imagesFactory } from './images-factory';
import { usersFactory } from './users-factory';

export const postsFactory = defineFactory({
  schema: database.schema,
  table: 'posts',
  resolver: ({ sequence, use }) => {
    return {
      id: `post-${sequence}`,
      userId: () => use(usersFactory).create().then((user) => user.id),
      imageId: () => use(imagesFactory).create().then((image) => image.id),
      word: 'Good',
      postedAt: new Date(),
    };
  },
});

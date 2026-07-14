import { database } from '@looks-to-me/package-database';
import { defineFactory } from '@praha/drizzle-factory';

import { postsFactory } from './posts-factory';

export const postCopiesFactory = defineFactory({
  schema: database.schema,
  table: 'postCopies',
  resolver: ({ use }) => {
    return {
      postId: () => use(postsFactory).create().then((post) => post.id),
      ipAddress: '127.0.0.1',
      copiedAt: new Date(),
    };
  },
});

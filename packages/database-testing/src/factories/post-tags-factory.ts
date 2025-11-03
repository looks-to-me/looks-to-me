import { database } from '@looks-to-me/package-database';
import { defineFactory } from '@praha/drizzle-factory';

import { postsFactory } from './posts-factory';
import { tagsFactory } from './tags-factory';

export const postTagsFactory = defineFactory({
  schema: database.schema,
  table: 'postTags',
  resolver: ({ use }) => {
    return {
      postId: () => use(postsFactory).create().then((post) => post.id),
      tagId: () => use(tagsFactory).create().then((tag) => tag.id),
      order: 0,
    };
  },
});

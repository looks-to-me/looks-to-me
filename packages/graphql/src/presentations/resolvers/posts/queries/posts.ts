import { resolveCursorConnection } from '@pothos/plugin-relay';
import { R } from '@praha/byethrow';
import * as v from 'valibot';

import { findPostsByNewest } from '../../../../applications/usecases/posts/queries/find-posts-by-newest';
import { findPostsByRandom } from '../../../../applications/usecases/posts/queries/find-posts-by-random';
import { auth } from '../../../../contexts';
import { builder } from '../../../core/builder';
import { deserialize } from '../../../helpers/deserialize';
import { serialize } from '../../../helpers/serialize';
import { Post } from '../types/post';

import type { ResolveCursorConnectionArgs } from '@pothos/plugin-relay';

const PostOrder = builder.enumType('PostOder', {
  description: 'Order options for posts',
  values: {
    NEWEST: {
      description: 'Order posts by newest first',
    },
    RANDOM: {
      description: 'Order posts randomly',
    },
  },
});

builder.queryField('posts', (t) => t.connection({
  type: Post,
  description: 'Get a paginated list of posts',
  args: {
    order: t.arg({ type: PostOrder, description: 'Order of posts', required: false }),
  },
  resolve: (_, { order, ...args }) => {
    return resolveCursorConnection(
      {
        args,
        toCursor: (post) => serialize(post.cursor),
      },
      async ({ after, limit }: ResolveCursorConnectionArgs) => {
        return R.pipe(
          R.do(),
          R.bind('auth', () => R.succeed(auth())),
          R.andThen(({ auth }) => {
            switch (order ?? 'NEWEST') {
              case 'NEWEST': {
                return findPostsByNewest({
                  limit,
                  userId: auth?.userId,
                  cursor: after ? deserialize(after, v.object({
                    id: v.string(),
                    postedAt: v.pipe(
                      v.string(),
                      v.isoTimestamp(),
                    ),
                  })) : undefined,
                });
              }
              case 'RANDOM': {
                return findPostsByRandom({
                  limit,
                  userId: auth?.userId,
                });
              }
            }
          }),
          R.unwrap(),
        );
      },
    );
  },
}));

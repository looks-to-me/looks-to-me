import { R } from '@praha/byethrow';

import { findPostById } from '../../../../applications/usecases/posts/queries/find-post-by-id';
import { builder } from '../../../core/builder';
import { Post } from '../types/post';

builder.queryField('post', (t) => t.field({
  type: Post,
  nullable: true,
  description: 'Get a post by its ID',
  args: {
    id: t.arg({ type: 'ID', description: 'The ID of the post' }),
  },
  resolve: (_, args) => {
    return R.pipe(
      findPostById({ id: args.id }),
      R.unwrap(),
    );
  },
}));

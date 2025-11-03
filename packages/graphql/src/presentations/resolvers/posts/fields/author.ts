import { R } from '@praha/byethrow';
import { ErrorFactory } from '@praha/error-factory';

import { findAuthorByPostId } from '../../../../applications/usecases/posts/fields/find-author-by-post-id';
import { builder } from '../../../core/builder';
import { User } from '../../users/types/user';
import { Post } from '../types/post';

class PostAuthorNotFoundError extends ErrorFactory({
  name: 'PostAuthorNotFoundError',
  message: 'The author of the post was not found.',
}) {}

builder.objectField(Post, 'author', (t) => t.field({
  type: User,
  description: 'The author of the post',
  resolve: async (post) => {
    return R.pipe(
      R.do(),
      R.andThen(() => findAuthorByPostId({ postId: post.id })),
      R.andThen((user) => {
        if (user) return R.succeed(user);
        return R.fail(new PostAuthorNotFoundError());
      }),
      R.unwrap(),
    );
  },
}));

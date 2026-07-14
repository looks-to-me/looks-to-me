import { env } from '../../../../contexts';
import { builder } from '../../../core/builder';
import { Post } from '../types/post';

builder.objectField(Post, 'imageUrl', (t) => t.field({
  type: 'String',
  description: 'The image URL of the post',
  resolve: (post) => {
    return `${env().APP_ORIGIN}/images/posts/${post.id}`;
  },
}));

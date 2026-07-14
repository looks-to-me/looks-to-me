import { builder } from '../../../core/builder';

export const Post = builder.simpleObject('Post', {
  description: 'A post object',
  fields: (t) => ({
    id: t.id({ description: 'The ID of the post' }),
    word: t.string({ description: 'The word of the post' }),
  }),
});

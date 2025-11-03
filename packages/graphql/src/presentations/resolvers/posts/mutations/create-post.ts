import { R } from '@praha/byethrow';
import { match } from 'ts-pattern';

import { createPost } from '../../../../applications/usecases/posts/mutations/create-post';
import { auth } from '../../../../contexts';
import { builder } from '../../../core/builder';
import { Error } from '../../../core/types';
import { File } from '../../../scalars/file';
import { Post } from '../types/post';

const CreatePostInput = builder.inputType('CreatePostInput', {
  description: 'Input for creating a post',
  fields: (t) => ({
    image: t.field({ type: File, description: 'Image file for the post' }),
    width: t.int({ description: 'The width of the post' }),
    height: t.int({ description: 'The height of the post' }),
    word: t.string({ description: 'The word associated with the post' }),
  }),
});

const CreatePostRequiresAuthenticationError = builder.simpleObject('CreatePostRequiresAuthenticationError', {
  interfaces: [Error],
  description: 'Error when authentication is required to create a post',
});

const CreatePostWordMustBeAlphabeticError = builder.simpleObject('CreatePostWordMustBeAlphabeticError', {
  interfaces: [Error],
  description: 'Error when the word is not alphabetic',
});

const CreatePostWordTooLongError = builder.simpleObject('CreatePostWordTooLongError', {
  interfaces: [Error],
  description: 'Error when the word exceeds the maximum length',
});

const CreatePostWordTooShortError = builder.simpleObject('CreatePostWordTooShortError', {
  interfaces: [Error],
  description: 'Error when the word is shorter than the minimum length',
});

const CreatePostError = builder.unionType('CreatePostError', {
  types: [
    CreatePostRequiresAuthenticationError,
    CreatePostWordMustBeAlphabeticError,
    CreatePostWordTooLongError,
    CreatePostWordTooShortError,
  ],
  description: 'Errors that can occur when creating a post',
  resolveType: (parent) => parent.kind,
});

const CreatePostPayload = builder.simpleObject('CreatePostPayload', {
  description: 'Payload for creating a post',
  fields: (t) => ({
    post: t.field({ type: Post, nullable: true, description: 'The created post' }),
    errors: t.field({ type: [CreatePostError], description: 'Errors that occurred during submission' }),
  }),
});

builder.mutationField('createPost', (t) => t.field({
  type: CreatePostPayload,
  description: 'Create a new post',
  args: {
    input: t.arg({ type: CreatePostInput }),
  },
  resolve: async (_, args) => {
    const { userId } = auth();
    if (!userId) {
      return {
        errors: [{ kind: CreatePostRequiresAuthenticationError.name, message: 'Authentication is required to create a post.' }],
      };
    }

    const result = await createPost({
      ...args.input,
      userId,
    });

    if (R.isSuccess(result)) {
      return {
        post: result.value,
        errors: [],
      };
    }

    return {
      errors: match(result.error)
        .with({ name: 'CreatePostWordMustBeAlphabeticError' }, (error) => [{ kind: CreatePostWordMustBeAlphabeticError.name, message: error.message }])
        .with({ name: 'CreatePostWordTooLongError' }, (error) => [{ kind: CreatePostWordTooLongError.name, message: error.message }])
        .with({ name: 'CreatePostWordTooShortError' }, (error) => [{ kind: CreatePostWordTooShortError.name, message: error.message }])
        .with({ name: 'UnexpectedError' }, (error) => { throw error; })
        .with({ name: 'UnreachableError' }, (error) => { throw error; })
        .exhaustive(),
    };
  },
}));

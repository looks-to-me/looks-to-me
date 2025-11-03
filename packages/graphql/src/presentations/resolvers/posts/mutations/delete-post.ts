import { R } from '@praha/byethrow';
import { match } from 'ts-pattern';

import { deletePost } from '../../../../applications/usecases/posts/mutations/delete-post';
import { auth } from '../../../../contexts';
import { builder } from '../../../core/builder';
import { Error } from '../../../core/types';
import { Post } from '../types/post';

const DeletePostInput = builder.inputType('DeletePostInput', {
  description: 'Input for deleting a post',
  fields: (t) => ({
    id: t.id({ description: 'The ID of the post to delete' }),
  }),
});

const DeletePostRequiresAuthenticationError = builder.simpleObject('DeletePostRequiresAuthenticationError', {
  interfaces: [Error],
  description: 'Error when authentication is required to delete a post',
});

const DeletePostNotFoundError = builder.simpleObject('DeletePostNotFoundError', {
  interfaces: [Error],
  description: 'Error when the post to be deleted is not found',
});

const DeletePostForbiddenError = builder.simpleObject('DeletePostForbiddenError', {
  interfaces: [Error],
  description: 'Error when the user is not allowed to delete the post',
});

const DeletePostError = builder.unionType('DeletePostError', {
  types: [
    DeletePostRequiresAuthenticationError,
    DeletePostNotFoundError,
    DeletePostForbiddenError,
  ],
  description: 'Errors that can occur when deleting a post',
  resolveType: (parent) => parent.kind,
});

const DeletePostPayload = builder.simpleObject('DeletePostPayload', {
  description: 'Payload for deleting a post',
  fields: (t) => ({
    post: t.field({ type: Post, nullable: true, description: 'The deleted post' }),
    errors: t.field({ type: [DeletePostError], description: 'Errors that occurred during deletion' }),
  }),
});

builder.mutationField('deletePost', (t) => t.field({
  type: DeletePostPayload,
  description: 'Delete a post',
  args: {
    input: t.arg({ type: DeletePostInput }),
  },
  resolve: async (_, args) => {
    const { userId } = auth();
    if (!userId) {
      return {
        errors: [{ kind: DeletePostRequiresAuthenticationError.name, message: 'Authentication is required to delete a post.' }],
      };
    }

    const result = await deletePost({
      id: args.input.id,
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
        .with({ name: 'DeletePostNotFoundError' }, (error) => [{ kind: DeletePostNotFoundError.name, message: error.message }])
        .with({ name: 'DeletePostForbiddenError' }, (error) => [{ kind: DeletePostForbiddenError.name, message: error.message }])
        .with({ name: 'UnexpectedError' }, (error) => { throw error; })
        .exhaustive(),
    };
  },
}));

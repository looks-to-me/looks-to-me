import { R } from '@praha/byethrow';
import { match } from 'ts-pattern';

import { unmuteUser } from '../../../../applications/usecases/users/mutations/unmute-user';
import { auth } from '../../../../contexts';
import { builder } from '../../../core/builder';
import { Error } from '../../../core/types';
import { User } from '../types/user';

const UnmuteUserInput = builder.inputType('UnmuteUserInput', {
  description: 'Input for submitting a post',
  fields: (t) => ({
    userId: t.id({ description: 'The word associated with the post' }),
  }),
});

const UnmuteUserRequiresAuthenticationError = builder.simpleObject('UnmuteUserRequiresAuthenticationError', {
  interfaces: [Error],
  description: 'Error when authentication is required to unmute user',
});

const UnmuteUserCannotUnmuteSelfError = builder.simpleObject('UnmuteUserCannotUnmuteSelfError', {
  interfaces: [Error],
  description: 'Error when user tries to unmute self',
});

const UnmuteUserNotFoundUserError = builder.simpleObject('UnmuteUserNotFoundUserError', {
  interfaces: [Error],
  description: 'Error when the user to be unmuted is not found',
});

const UnmuteUserError = builder.unionType('UnmuteUserError', {
  types: [
    UnmuteUserRequiresAuthenticationError,
    UnmuteUserCannotUnmuteSelfError,
    UnmuteUserNotFoundUserError,
  ],
  description: 'Errors that can occur when submitting a post',
  resolveType: (parent) => parent.kind,
});

const UnmuteUserPayload = builder.simpleObject('UnmuteUserPayload', {
  description: 'Payload for unmutate a user',
  fields: (t) => ({
    user: t.field({ type: User, nullable: true, description: 'The unmuted user' }),
    errors: t.field({ type: [UnmuteUserError], description: 'Errors that occurred during unmutate' }),
  }),
});

builder.mutationField('unmuteUser', (t) => t.field({
  type: UnmuteUserPayload,
  description: 'Unmutate a user',
  args: {
    input: t.arg({ type: UnmuteUserInput }),
  },
  resolve: async (_, args) => {
    const { userId } = auth();
    if (!userId) {
      return {
        errors: [{ kind: UnmuteUserRequiresAuthenticationError.name, message: 'Authentication is required to submit a post.' }],
      };
    }

    const result = await unmuteUser({
      userId,
      targetUserId: args.input.userId,
    });

    if (R.isSuccess(result)) {
      return {
        post: result.value,
        errors: [],
      };
    }

    return {
      errors: match(result.error)
        .with({ name: 'UnmuteUserCannotUnmuteSelfError' }, (error) => [{ kind: UnmuteUserCannotUnmuteSelfError.name, message: error.message }])
        .with({ name: 'UnmuteUserNotFoundUserError' }, (error) => [{ kind: UnmuteUserNotFoundUserError.name, message: error.message }])
        .with({ name: 'UnexpectedError' }, (error) => { throw error; })
        .exhaustive(),
    };
  },
}));

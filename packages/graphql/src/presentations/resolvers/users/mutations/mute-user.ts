import { R } from '@praha/byethrow';
import { match } from 'ts-pattern';

import { muteUser } from '../../../../applications/usecases/users/mutations/mute-user';
import { auth } from '../../../../contexts';
import { builder } from '../../../core/builder';
import { Error } from '../../../core/types';
import { User } from '../types/user';

const MuteUserInput = builder.inputType('MuteUserInput', {
  description: 'Input for submitting a post',
  fields: (t) => ({
    userId: t.id({ description: 'The word associated with the post' }),
  }),
});

const MuteUserRequiresAuthenticationError = builder.simpleObject('MuteUserRequiresAuthenticationError', {
  interfaces: [Error],
  description: 'Error when authentication is required to mute user',
});

const MuteUserCannotMuteSelfError = builder.simpleObject('MuteUserCannotMuteSelfError', {
  interfaces: [Error],
  description: 'Error when user tries to mute self',
});

const MuteUserNotFoundUserError = builder.simpleObject('MuteUserNotFoundUserError', {
  interfaces: [Error],
  description: 'Error when the user to be muted is not found',
});

const MuteUserError = builder.unionType('MuteUserError', {
  types: [
    MuteUserRequiresAuthenticationError,
    MuteUserCannotMuteSelfError,
    MuteUserNotFoundUserError,
  ],
  description: 'Errors that can occur when submitting a post',
  resolveType: (parent) => parent.kind,
});

const MuteUserPayload = builder.simpleObject('MuteUserPayload', {
  description: 'Payload for mutate a user',
  fields: (t) => ({
    user: t.field({ type: User, nullable: true, description: 'The muted user' }),
    errors: t.field({ type: [MuteUserError], description: 'Errors that occurred during mutate' }),
  }),
});

builder.mutationField('muteUser', (t) => t.field({
  type: MuteUserPayload,
  description: 'Mutate a user',
  args: {
    input: t.arg({ type: MuteUserInput }),
  },
  resolve: async (_, args) => {
    const { userId } = auth();
    if (!userId) {
      return {
        errors: [{ kind: MuteUserRequiresAuthenticationError.name, message: 'Authentication is required to submit a post.' }],
      };
    }

    const result = await muteUser({
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
        .with({ name: 'MuteUserCannotMuteSelfError' }, (error) => [{ kind: MuteUserCannotMuteSelfError.name, message: error.message }])
        .with({ name: 'MuteUserNotFoundUserError' }, (error) => [{ kind: MuteUserNotFoundUserError.name, message: error.message }])
        .with({ name: 'UnexpectedError' }, (error) => { throw error; })
        .exhaustive(),
    };
  },
}));

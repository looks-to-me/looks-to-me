'use server';

import { R } from '@praha/byethrow';
import { revalidatePath } from 'next/cache';

import { graphqlExecutor } from '../../../../graphql';
import { graphql } from '../../../../graphql/generated';

import type { Route } from 'next';

const MuteUserMutation = graphql(/** GraphQL */ `
  mutation MuteUser($input: MuteUserInput!) {
    muteUser(input: $input) {
      user {
        id
        name
      }
      errors {
        ...on Error {
          __typename
          message
        }
      }
    }
  }
`);

export type MuteUserInput = {
  userId: string;
};

export type MuteUserOutput = {
  message: string;
};

export type MuteUserError = {
  message: string;
  redirect?: Route<'/login'>;
};

export const muteUser = async (input: MuteUserInput): R.ResultAsync<MuteUserOutput, MuteUserError> => {
  const result = await graphqlExecutor({
    document: MuteUserMutation,
    variables: { input },
  });

  if (!result.muteUser.user || result.muteUser.errors.length) {
    if (result.muteUser.errors.some((error) => error.__typename === 'MuteUserRequiresAuthenticationError')) {
      return R.fail({ message: 'You must be logged in to mute a user.', redirect: '/login' });
    }

    return R.fail({ message: 'Post creation failed!' });
  }

  revalidatePath(`/@${result.muteUser.user.name}`);
  return R.succeed({ message: `@${result.muteUser.user.name} has been muted.` });
};

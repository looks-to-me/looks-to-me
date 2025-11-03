'use server';

import { R } from '@praha/byethrow';
import { revalidatePath } from 'next/cache';

import { graphqlExecutor } from '../../../../graphql';
import { graphql } from '../../../../graphql/generated';

import type { Route } from 'next';

const UnmuteUserMutation = graphql(/** GraphQL */ `
  mutation UnmuteUser($input: UnmuteUserInput!) {
    unmuteUser(input: $input) {
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

export type UnmuteUserInput = {
  userId: string;
};

export type UnmuteUserOutput = {
  message: string;
};

export type UnmuteUserError = {
  message: string;
  redirect?: Route<'/login'>;
};

export const unmuteUser = async (input: UnmuteUserInput): R.ResultAsync<UnmuteUserOutput, UnmuteUserError> => {
  const result = await graphqlExecutor({
    document: UnmuteUserMutation,
    variables: { input },
  });

  if (!result.unmuteUser.user || result.unmuteUser.errors.length) {
    if (result.unmuteUser.errors.some((error) => error.__typename === 'UnmuteUserRequiresAuthenticationError')) {
      return R.fail({ message: 'You must be logged in to unmute a user.', redirect: '/login' });
    }

    return R.fail({ message: 'Post creation failed!' });
  }

  revalidatePath(`/@${result.unmuteUser.user.name}`);
  return R.succeed({ message: `@${result.unmuteUser.user.name} has been unmuted.` });
};

'use server';

import { R } from '@praha/byethrow';
import { revalidatePath } from 'next/cache';

import { graphqlExecutor } from '../../../../graphql';
import { graphql } from '../../../../graphql/generated';

import type { Route } from 'next';

const DeletePostMutation = graphql(/** GraphQL */ `
  mutation DeletePost($input: DeletePostInput!) {
    deletePost(input: $input) {
      post {
        id
        author {
          id
          name
        }
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

export type DeletePostInput = {
  postId: string;
};

export type DeletePostOutput = {
  message: string;
  redirect: Route<`/@${string}`>;
};

export type DeletePostError = {
  message: string;
  redirect?: Route<'/login'>;
};

export const deletePost = async (input: DeletePostInput): R.ResultAsync<DeletePostOutput, DeletePostError> => {
  const result = await graphqlExecutor({
    document: DeletePostMutation,
    variables: { input: { id: input.postId } },
  });

  if (!result.deletePost.post || result.deletePost.errors.length) {
    if (result.deletePost.errors.some((error) => error.__typename === 'DeletePostRequiresAuthenticationError')) {
      return R.fail({ message: 'You must be logged in to delete a post.', redirect: '/login' });
    }

    return R.fail({ message: 'Post deletion failed!' });
  }

  const redirect: Route<`/@${string}`> = `/@${result.deletePost.post.author.name}`;

  revalidatePath(redirect);
  revalidatePath('/');
  revalidatePath('/shuffle');

  return R.succeed({ message: 'The post has been successfully deleted.', redirect });
};

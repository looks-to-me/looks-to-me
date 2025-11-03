'use server';

import { R } from '@praha/byethrow';
import { revalidatePath } from 'next/cache';
import * as v from 'valibot';

import { graphqlExecutor } from '../../../../../../graphql';
import { graphql } from '../../../../../../graphql/generated';
import { postWordSchema } from '../../../../../../schemas/post-word-schema';

import type { Route } from 'next';

const CreatePostMutation = graphql(/** GraphQL */ `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        id
        author {
          name
        }
      }
      errors {
        ...on Error {
          message
        }
      }
    }
  }
`);

const inputSchema = v.object({
  image: v.instance(Blob),
  width: v.pipe(v.unknown(), v.transform(Number), v.minValue(1)),
  height: v.pipe(v.unknown(), v.transform(Number), v.minValue(1)),
  word: postWordSchema,
});

export type CreatePostOutput = {
  message: string;
  redirectUrl: Route<`/@${string}/posts/${string}`>;
};

export type CreatePostError = {
  message: string;
};

export const createPost = async (formData: FormData): R.ResultAsync<CreatePostOutput, CreatePostError> => {
  try {
    const result = await graphqlExecutor({
      document: CreatePostMutation,
      variables: {
        input: v.parse(inputSchema, {
          image: formData.get('image'),
          width: formData.get('image-width'),
          height: formData.get('image-height'),
          word: formData.get('word'),
        }),
      },
    });

    if (!result.createPost.post || result.createPost.errors.length) {
      return R.fail({ message: 'Post creation failed!' });
    }

    revalidatePath('/');
    revalidatePath(`/@${result.createPost.post.author.name}`);

    return R.succeed({
      message: 'Post created!',
      redirectUrl: `/@${result.createPost.post.author.name}/posts/${result.createPost.post.id}`,
    });
  } catch (error) {
    console.error(error);
    return R.fail({ message: 'Post creation failed!' });
  }
};

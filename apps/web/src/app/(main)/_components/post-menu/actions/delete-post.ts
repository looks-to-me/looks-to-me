'use server';

import { deleteImageCache } from '@looks-to-me/package-image-cache';
import { revalidatePath } from 'next/cache';

import { getLoginUser } from '../../../../../queries/user/get-login-user';
import { deleteImage } from '../../../../../repositories/image-repository';
import { deletePost, findPostById } from '../../../../../repositories/post-repository';
import { privateEnv } from '../../../../_libs/env';

import type { Route } from 'next';

export type DeletePostResult = {
  type: 'success';
  message: string;
  redirectUrl: Route<`/@${string}`>;
} | {
  type: 'error';
  reason: 'unauthorized' | 'notFound' | 'badRequest';
  message: string;
};

export const deletePostAction = async (postId: string): Promise<DeletePostResult> => {
  const user = await getLoginUser();
  if (!user) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

  const post = await findPostById(postId);
  if (!post) return { type: 'error', reason: 'notFound', message: 'Post not found!' };

  const isMyPost = user.id === post.userId;
  if (!isMyPost) return { type: 'error', reason: 'badRequest', message: 'Not the owner of the Post!' };

  await deletePost(postId);
  await deleteImage(post.imageId);
  await deleteImageCache({ bucket: privateEnv().BUCKET, path: `images/posts/${post.id}` });

  revalidatePath('/');
  revalidatePath('/shuffle');
  revalidatePath(`/@${user.profile.name}`);
  
  return { type: 'success', redirectUrl: `/@${user.profile.name}`, message: 'The post has been successfully deleted.' };
};

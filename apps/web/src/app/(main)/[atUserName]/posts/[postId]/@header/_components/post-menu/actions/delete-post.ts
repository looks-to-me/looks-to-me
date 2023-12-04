'use server';

import { deleteImageCache } from '@looks-to-me/package-image-cache';

import { getUserMetadata } from '../../../../../../../../_libs/auth/server/get-user-metadata';
import { privateEnv } from '../../../../../../../../_libs/env';
import { deleteImage } from '../../../../../../../_repositories/image-repository';
import { deletePost, findPostById, findPostByImageId } from '../../../../../../../_repositories/post-repository';
import { findUserProviderByTypeAndSub } from '../../../../../../../_repositories/user-provider-repository';
import { findUserById } from '../../../../../../../_repositories/user-repository';

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
  const userMetadata = await getUserMetadata();
  if (!userMetadata) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

  const userProvider = await findUserProviderByTypeAndSub(userMetadata.provider, userMetadata.sub);
  if (!userProvider) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

  const user = await findUserById(userProvider.userId);
  if (!user) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

  const post = await findPostById(postId);
  if (!post) return { type: 'error', reason: 'notFound', message: 'Post not found!' };

  const isMyPost = user.id === post.userId;
  if (!isMyPost) return { type: 'error', reason: 'badRequest', message: 'Not the owner of the Post!' };

  await deletePost(postId);

  const existPost = await findPostByImageId(post.imageId);
  if (!existPost) {
    await deleteImage(post.imageId);
    await deleteImageCache({ bucket: privateEnv().BUCKET,postId: post.id });
  }
  return { type: 'success', redirectUrl: `/@${user.profile.name}`, message: 'The post has been successfully deleted.' };
};

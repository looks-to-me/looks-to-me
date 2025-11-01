'use server';

import { tieredCache } from '@looks-to-me/package-tiered-cache';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { revalidatePath } from 'next/cache';

import { getLoginUser } from '../../../../../queries/user/get-login-user';
import { deleteImage } from '../../../../../repositories/image-repository';
import { deletePost, findPostById } from '../../../../../repositories/post-repository';

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

  const { ctx, env } = getCloudflareContext();
  const cache = tieredCache({
    bucket: env.TIERED_CACHE,
    waitUntil: ctx.waitUntil.bind(ctx),
  });

  await deletePost(postId);
  await deleteImage(post.imageId);
  await cache.delete(`/images/posts/${post.id}`);

  revalidatePath('/');
  revalidatePath('/shuffle');
  revalidatePath(`/@${user.profile.name}`);

  return { type: 'success', redirectUrl: `/@${user.profile.name}`, message: 'The post has been successfully deleted.' };
};

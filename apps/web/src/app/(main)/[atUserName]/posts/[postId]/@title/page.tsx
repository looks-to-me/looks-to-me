import { notFound } from 'next/navigation';

import { PostDetailsHeader } from '../../../../../../components/domains/post/post-details-header';
import { getLoginUser } from '../../../../../../queries/user/get-login-user';
import { findMuteUserByUserIdAndMuteUserId } from '../../../../../../repositories/mute-user-repository';
import { findPostById } from '../../../../../../repositories/post-repository';
import { findUserById } from '../../../../../../repositories/user-repository';

import type { FC } from 'react';

export type UserPostDetailsTitlePageProps = PageProps<'/[atUserName]/posts/[postId]'>;

const UserPostDetailsTitlePage: FC<UserPostDetailsTitlePageProps> = async ({
  params,
}) => {
  const { postId } = await params;
  const post = await findPostById(postId);
  if (!post) return notFound();

  const user = await findUserById(post.userId);
  if (!user) return notFound();

  const loginUser = await getLoginUser();
  const isMuteUser = loginUser
    ? !!await findMuteUserByUserIdAndMuteUserId(loginUser.id, post.userId)
    : false;

  return (
    <PostDetailsHeader
      postUser={user}
      post={post}
      loginUser={loginUser}
      isMuteUser={isMuteUser}
    />
  );
};

export default UserPostDetailsTitlePage;

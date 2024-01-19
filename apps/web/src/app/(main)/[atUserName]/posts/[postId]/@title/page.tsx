import { notFound } from 'next/navigation';

import { PostDetailsHeader } from '../../../../../../components/domains/post/post-details-header/post-details-header';
import { getLoginUser } from '../../../../../../queries/user/get-login-user';
import { findMuteUserByUserIdAndMuteUserId } from '../../../../../../repositories/mute-user-repository';
import { findPostById } from '../../../../../../repositories/post-repository';
import { findUserById } from '../../../../../../repositories/user-repository';

import type { PageProps } from '../../../../../../types/page-props';
import type { UserPostDetailsPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserPostDetailsTitlePageProps = UserPostDetailsPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const UserPostDetailsTitlePage: FC<UserPostDetailsTitlePageProps> = async ({
  params,
}) => {
  const post = await findPostById(params.postId);
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

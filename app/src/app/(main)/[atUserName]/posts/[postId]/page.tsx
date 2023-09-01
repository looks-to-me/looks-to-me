import { notFound } from 'next/navigation';

import { findPostById } from '../../../_repositories/post-repository';
import { findUserByName } from '../../../_repositories/user-repository';
import { getUserName } from '../../_helpers/getUserName';

import type { UserProfilePageProps } from '../../(profile)/page';
import type { PageProps } from '../../../../_types/page-props';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserPostDetailsPageProps = UserProfilePageProps & PageProps<{
  params: {
    postId: string;
  };
  searchParams: {
    // empty
  };
}>;

const UserPostDetailsPage: FC<UserPostDetailsPageProps> = async ({
  params,
}) => {
  const userName = getUserName(params.atUserName);
  if (!userName) return notFound();

  const user = await findUserByName(userName);
  if (!user) return notFound();

  const post = await findPostById(params.postId);
  if (!post || post.userId !== user.id) return notFound();

  return (
    <div>
      PostDetails
    </div>
  );
};

export default UserPostDetailsPage;

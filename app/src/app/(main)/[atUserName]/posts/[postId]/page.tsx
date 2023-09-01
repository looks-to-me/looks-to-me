import { notFound } from 'next/navigation';

import { findPostById } from '../../../_repositories/post-repository';

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
  const post = await findPostById(params.postId);
  if (!post) return notFound();

  return (
    <div>
      Looks {post.word} To Me
    </div>
  );
};

export default UserPostDetailsPage;

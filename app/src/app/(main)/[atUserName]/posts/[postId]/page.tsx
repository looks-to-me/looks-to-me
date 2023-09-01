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

const UserPostDetailsPage: FC<UserPostDetailsPageProps> = () => {
  return null;
};

export default UserPostDetailsPage;

import type { UserDetailsPageProps } from '../../(details)/page';
import type { PageProps } from '../../../../../types/page-props';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserPostDetailsPageProps = UserDetailsPageProps & PageProps<{
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

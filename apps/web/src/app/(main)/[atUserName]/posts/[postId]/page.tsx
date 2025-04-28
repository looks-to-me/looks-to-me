import type { UserDetailsPageProps } from '../../(details)/page';
import type { PageProps } from '../../../../../types/page-props';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserPostDetailsPageProps = UserDetailsPageProps & PageProps<{
  params: Promise<{
    postId: string;
  }>;
  searchParams: Promise<{
    // empty
  }>;
}>;

const UserPostDetailsPage: FC<UserPostDetailsPageProps> = () => {
  return null;
};

export default UserPostDetailsPage;

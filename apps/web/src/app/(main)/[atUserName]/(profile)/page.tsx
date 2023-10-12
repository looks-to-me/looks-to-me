import type { PageProps } from '../../../_types/page-props';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserProfilePageProps = PageProps<{
  params: {
    /**
     * username string that starts with "@"
     */
    atUserName: string;
  };
  searchParams: {
    // empty
  };
}>;

const UserProfilePage: FC<UserProfilePageProps> = () => {
  return null;
};

export default UserProfilePage;

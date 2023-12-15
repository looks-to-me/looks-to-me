import type { PageProps } from '../../../../types/page-props';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserDetailsPageProps = PageProps<{
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

const UserDetailsPage: FC<UserDetailsPageProps> = () => {
  return null;
};

export default UserDetailsPage;

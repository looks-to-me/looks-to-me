import { notFound } from 'next/navigation';

import { getUserName } from '../_helpers/getUserName';

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

const UserProfilePage: FC<UserProfilePageProps> = ({
  params,
}) => {
  const userName = getUserName(params.atUserName);
  if (!userName) return notFound();

  return <div>{`hello ${userName}`}</div>;
};

export default UserProfilePage;

import { notFound } from 'next/navigation';

import { getUserName } from './_helpers/getUserName';

import type { NextPageProps } from '../../_types/nextPageProps';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserProfilePageProps = NextPageProps<{
  /**
   * username string that starts with "@"
   */
  atUserName: string;
}>;

const UserProfilePage: FC<UserProfilePageProps> = ({
  params,
}) => {
  const username = getUserName(params.atUserName);
  if (!username) return notFound();

  return <div>{`hello ${username}`}</div>;
};

export default UserProfilePage;

import { notFound } from 'next/navigation';

import { getUserName } from '../_helpers/getUserName';

import type { UserProfilePageProps } from '../_types/userProfilePageProps';
import type { FC } from 'react';

export const runtime = 'edge';

const UserProfilePage: FC<UserProfilePageProps> = ({
  params,
}) => {
  const userName = getUserName(params.atUserName);
  if (!userName) return notFound();

  return <div>{`hello ${userName}`}</div>;
};

export default UserProfilePage;

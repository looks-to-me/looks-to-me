import { notFound } from 'next/navigation';

import { getUserName } from './_helpers/getUserName';

import type { UserProfilePageProps } from './_types/userProfilePageProps';
import type { FC } from 'react';

export const runtime = 'edge';

const UserProfilePage: FC<UserProfilePageProps> = ({
  params,
}) => {
  const username = getUserName(params.atUsername);
  if (!username) return notFound();

  return <div>{`hello ${username}`}</div>;
};

export default UserProfilePage;

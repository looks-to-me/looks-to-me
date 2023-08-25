import { notFound } from 'next/navigation';

import type { NextPageProps } from '../../_types/nextPageProps';
import type { FC } from 'react';

export const runtime = 'edge';

const getUsername = (atUsername: string): string => {
  const decodedAtUsername = decodeURIComponent(atUsername);
  const at = decodedAtUsername.at(0);
  if (at !== '@') {
    return '';
  }
  return decodedAtUsername.slice(1);
};

const UserProfilePage: FC<
  NextPageProps<{
    /**
     * username string that starts with "@"
     */
    atUsername: string;
  }>
> = ({ params: { atUsername } }) => {
  const username = getUsername(atUsername);
  if (username === '') {
    return notFound();
  }
  return <div>{`hello ${username}`}</div>;
};

export default UserProfilePage;

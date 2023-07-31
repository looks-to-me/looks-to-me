import { notFound } from 'next/navigation';

import type { NextPageProps } from '../_types/nextPageProps';
import type { FC } from 'react';

export const runtime = 'edge';

const UserProfilePage: FC<
  NextPageProps<{
    /**
     * username string that starts with "@"
     */
    atUsername: string;
  }>
> = ({ params: { atUsername } }) => {
  const decodedAtUsername = decodeURIComponent(atUsername);
  const at = decodedAtUsername.slice(0, 1);
  if (at !== '@') {
    return notFound();}

  const username = decodedAtUsername.slice(1);
  if (username === '') {
    return notFound();
  }
  return <div>{`hello ${username}`}</div>;
};

export default UserProfilePage;

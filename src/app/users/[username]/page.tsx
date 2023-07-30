import type { NextPageProps } from '../../_types/nextPageProps';
import type { FC } from 'react';

export const runtime = 'edge';

export const UserProfilePage: FC<NextPageProps<{ username: string }>> = ({
  params: { username },
}) => {
  return <div>{`hello ${username}`}</div>;
};

export default UserProfilePage;

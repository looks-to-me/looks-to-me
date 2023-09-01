import { notFound } from 'next/navigation';

import { findUserByName } from '../../../_repositories/user-repository';
import { getUserName } from '../../_helpers/getUserName';
import { UserSummary } from '../_components/user-summary';

import type { PageProps } from '../../../../_types/page-props';
import type { UserProfilePageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserProfileHeaderPageProps = UserProfilePageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const UserProfileHeaderPage: FC<UserProfileHeaderPageProps> = async ({
  params,
}) => {
  const userName = getUserName(params.atUserName);
  if (!userName) return notFound();

  const user = await findUserByName(userName);
  if (!user) return notFound();

  return (
    <header>
      <UserSummary 
        avatarUrl={user.profile.avatarUrl}
        name={user.profile.displayName ?? user.profile.name}
        numOfPosts={120}
      />
    </header>
  );
};

export default UserProfileHeaderPage;

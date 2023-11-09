import { notFound } from 'next/navigation';

import { UserSummary } from './_components/user-summary';
import * as styles from './page.css';
import { countPostsByUserId } from '../../../_repositories/post-repository';
import { findUserByName } from '../../../_repositories/user-repository';
import { getUserName } from '../../_helpers/get-user-name';

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

  const numberOfPosts = await countPostsByUserId(user.id);

  return (
    <header className={styles.wrapper}>
      <UserSummary
        user={user}
        numOfPosts={numberOfPosts}
      />
    </header>
  );
};

export default UserProfileHeaderPage;

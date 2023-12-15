import { notFound } from 'next/navigation';

import * as styles from './page.css';
import { UserSummary } from '../../../../../components/domains/user/user-summary';
import { countPostsByUserId } from '../../../../../repositories/post-repository';
import { findUserByName } from '../../../../../repositories/user-repository';
import { getUserName } from '../../_helpers/get-user-name';

import type { PageProps } from '../../../../_types/page-props';
import type { UserDetailsPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserDetailsProfilePageProps = UserDetailsPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const UserDetailsProfilePage: FC<UserDetailsProfilePageProps> = async ({
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

export default UserDetailsProfilePage;

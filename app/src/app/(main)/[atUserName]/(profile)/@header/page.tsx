import { notFound } from 'next/navigation';

import * as styles from './page.css';
import { findPostsByUserId } from '../../../_repositories/post-repository';
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

  const posts = await findPostsByUserId(user.id);

  return (
    <header className={styles.wrapper}>
      <UserSummary 
        avatarUrl={user.profile.avatarUrl}
        name={user.profile.displayName ?? user.profile.name}
        // TODO: githubUrl
        numOfPosts={posts.length}
      />
    </header>
  );
};

export default UserProfileHeaderPage;

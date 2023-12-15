import * as styles from './layout.css';
import { ApplicationLayout } from '../../../../components/domains/application/application-layout';
import { createMetadata } from '../../../../helpers/create-metadata';
import { findUserByName } from '../../../../repositories/user-repository';
import { getUserName } from '../_helpers/get-user-name';

import type { UserDetailsPageProps } from './page';
import type { LayoutProps } from '../../../../types/layout-props';
import type { FC, ReactNode } from 'react';

export const generateMetadata = async ({ params }: UserDetailsPageProps) => {
  const userName = getUserName(params.atUserName);
  if (!userName) return {};

  const user = await findUserByName(userName);
  if (!user) return {};

  const title = user.profile.displayName ?? user.profile.name;

  // TODO: Make it return the OGP image including the user profile.
  return createMetadata({
    title,
  });
};

export type UserDetailsLayoutProps = UserDetailsPageProps & LayoutProps<{
  header: ReactNode;
  profile: ReactNode;
  posts: ReactNode;
}>;

const UserDetailsLayout: FC<UserDetailsLayoutProps> = ({
  header,
  profile,
  posts,
  children,
}) => {
  return (
    <ApplicationLayout header={header}>
      <main className={styles.main}>
        <article className={styles.article}>
          {profile}
          {posts}
        </article>
        {children}
      </main>
    </ApplicationLayout>
  );
};

export default UserDetailsLayout;

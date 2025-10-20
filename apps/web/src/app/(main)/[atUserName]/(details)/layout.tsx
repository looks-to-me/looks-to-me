import { notFound } from 'next/navigation';

import * as styles from './layout.css';
import { ApplicationLayout } from '../../../../components/domains/application/application-layout';
import { Banner } from '../../../../components/elements/banner';
import { createMetadata } from '../../../../helpers/create-metadata';
import { getIsMutedUserByName } from '../../../../queries/user/get-is-muted-user-by-name';
import { findUserByName } from '../../../../repositories/user-repository';
import { getUserName } from '../_helpers/get-user-name';

import type { FC } from 'react';

export const generateMetadata = async ({ params }: UserDetailsLayoutProps) => {
  const { atUserName } = await params;
  const userName = getUserName(atUserName);
  if (!userName) return {};

  const user = await findUserByName(userName);
  if (!user) return {};

  const title = user.profile.displayName ?? user.profile.name;

  // TODO: Make it return the OGP image including the user profile.
  return createMetadata({
    title,
  });
};

export type UserDetailsLayoutProps = LayoutProps<'/[atUserName]'>;

const UserDetailsLayout: FC<UserDetailsLayoutProps> = async ({
  header,
  profile,
  posts,
  params,
  children,
}) => {
  const { atUserName } = await params;
  const userName = getUserName(atUserName);
  if (!userName) return notFound();

  const isMute = await getIsMutedUserByName(userName);
  return (
    <ApplicationLayout header={header}>
      {isMute && <Banner>This user is currently muted.</Banner>}
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

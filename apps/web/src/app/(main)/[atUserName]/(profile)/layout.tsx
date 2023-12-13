import * as styles from './layout.css';
import { Breadcrumbs, BreadcrumbsItem } from '../../../../components/elements/breadcrumbs';
import { createMetadata } from '../../../_helpers/create-metadata';
import { PageHeader } from '../../_components/page-header';
import { PageLayout } from '../../_components/page-layout';
import { findUserByName } from '../../_repositories/user-repository';
import { getUserName } from '../_helpers/get-user-name';

import type { UserProfilePageProps } from './page';
import type { LayoutProps } from '../../../_types/layout-props';
import type { FC, ReactNode } from 'react';

export const generateMetadata = async ({ params }: UserProfilePageProps) => {
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

export type UserProfileLayoutProps = UserProfilePageProps & LayoutProps<{
  header: ReactNode;
  posts: ReactNode;
}>;

const UserProfileLayout: FC<UserProfileLayoutProps> = ({
  params,
  header,
  posts,
  children,
}) => {
  const userName = getUserName(params.atUserName);

  return (
    <PageLayout
      header={(
        <PageHeader>
          <Breadcrumbs>
            <BreadcrumbsItem href={`/@${userName}`}>
              {userName}
            </BreadcrumbsItem>
          </Breadcrumbs>
        </PageHeader>
      )}
    >
      <main className={styles.main}>
        <article className={styles.article}>
          {header}
          {posts}
        </article>
        {children}
      </main>
    </PageLayout>
  );
};

export default UserProfileLayout;

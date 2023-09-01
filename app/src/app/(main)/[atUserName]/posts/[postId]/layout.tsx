import { notFound, redirect } from 'next/navigation';

import * as styles from './layout.css';
import { Breadcrumbs, BreadcrumbsItem } from '../../../../_components/breadcrumbs';
import { PageHeader } from '../../../_components/page-header';
import { PageLayout } from '../../../_components/page-layout';
import { findPostById } from '../../../_repositories/post-repository';
import { findUserById } from '../../../_repositories/user-repository';
import { getUserName } from '../../_helpers/getUserName';

import type { UserPostDetailsPageProps } from './page';
import type { LayoutProps } from '../../../../_types/layout-props';
import type { Metadata } from 'next';
import type { FC, ReactNode } from 'react';

export const generateMetadata = async ({ params }: UserPostDetailsPageProps): Promise<Metadata> => {
  const userName = getUserName(params.atUserName);
  if (!userName) return {};

  const post = await findPostById(params.postId);
  if (!post) return {};

  const user = await findUserById(post.userId);
  if (!user) return {};

  return {
    title: `${user.profile.displayName ?? user.profile.name} / Looks ${post.word} To Me`,
  };
};

export type UserPostDetailsLayoutProps = UserPostDetailsPageProps & LayoutProps<{
  header: ReactNode;
}>;

const UserPostDetailsLayout: FC<UserPostDetailsLayoutProps> = async ({
  children,
  header,
  params,
}) => {
  const userName = getUserName(params.atUserName);
  if (!userName) return notFound();

  const post = await findPostById(params.postId);
  if (!post) return notFound();

  const user = await findUserById(post.userId);
  if (!user) return notFound();

  if (user.profile.name !== userName) {
    // redirect to correct username
    return redirect(`/@${user.profile.name}/posts/${post.id}`);
  }

  return (
    <PageLayout
      header={(
        <PageHeader>
          <Breadcrumbs>
            <BreadcrumbsItem href={`/@${user.profile.name}`}>
              {user.profile.displayName ?? user.profile.name}
            </BreadcrumbsItem>
            <BreadcrumbsItem href={`/@${user.profile.name}/posts/${post.id}`}>
              Looks {post.word} To Me
            </BreadcrumbsItem>
          </Breadcrumbs>
        </PageHeader>
      )}
    >
      <main className={styles.main}>
        <article className={styles.article}>
          {header}
        </article>
        {children}
      </main>
    </PageLayout>
  );
};

export default UserPostDetailsLayout;

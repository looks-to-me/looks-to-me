import Link from 'next/link';
import { notFound } from 'next/navigation';

import * as styles from './layout.css';
import { Button } from '../../../../_components/button';
import { PageHeader } from '../../../_components/page-header';
import { PageLayout } from '../../../_components/page-layout';
import { findPostById } from '../../../_repositories/post-repository';
import { findUserByName } from '../../../_repositories/user-repository';
import { getUserName } from '../../_helpers/getUserName';

import type { NextPageProps } from '../../../../_types/nextPageProps';
import type { Metadata } from 'next';
import type { FC, ReactNode } from 'react';

export const generateMetadata = async ({ params }: UserPostDetailsLayoutProps): Promise<Metadata> => {
  const userName = getUserName(params.atUserName);
  if (!userName) return {};

  const user = await findUserByName(userName);
  if (!user) return {};

  const post = await findPostById(params.postId);
  if (!post || post.userId !== user.id) return {};

  return {
    title: `${user.profile.displayName ?? user.profile.name} / Looks ${post.word} To Me`,
  };
};

export type UserPostDetailsLayoutProps = NextPageProps<{
  atUserName: string;
  postId: string;
}> & {
  children: ReactNode;
};

const UserPostDetailsLayout: FC<UserPostDetailsLayoutProps> = async ({
  children,
  params,
}) => {
  const userName = getUserName(params.atUserName);
  if (!userName) return notFound();

  const user = await findUserByName(userName);
  if (!user) return notFound();

  const post = await findPostById(params.postId);
  if (!post || post.userId !== user.id) return notFound();

  return (
    <PageLayout
      header={(
        <PageHeader>
          <div className={styles.breadcrumb}>
            <Button className={styles.title} variant="ghost" size="tiny" borderless asChild>
              <Link href={`/@${user.profile.name}`}>
                {user.profile.displayName ?? user.profile.name}
              </Link>
            </Button>
            <div className={styles.divider}>
              /
            </div>
            <Button className={styles.title} variant="ghost" size="tiny" borderless asChild>
              <Link href={`/@${user.profile.name}/posts/${post.id}`}>
                Looks {post.word} To Me
              </Link>
            </Button>
          </div>
        </PageHeader>
      )}
    >
      <main className={styles.main}>
        {children}
      </main>
    </PageLayout>
  );
};

export default UserPostDetailsLayout;

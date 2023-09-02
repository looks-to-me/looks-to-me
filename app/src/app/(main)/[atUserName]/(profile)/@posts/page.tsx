import { notFound } from 'next/navigation';

import { fetchUserPosts } from './_actions/fetch-user-posts';
import * as styles from './page.css';
import { PostList } from '../../../_components/post-list';
import { findUserByName } from '../../../_repositories/user-repository';
import { getUserName } from '../../_helpers/getUserName';

import type { InfiniteScrollFetcher } from '../../../../_components/infinite-scroll';
import type { PageProps } from '../../../../_types/page-props';
import type { UserProfilePageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserProfileMainPageProps = UserProfilePageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const UserProfilePostsPage: FC<UserProfileMainPageProps> = async ({
  params,
}) => {
  const userName = getUserName(params.atUserName);
  if (!userName) return notFound();

  const user = await findUserByName(userName);
  if (!user) return notFound();

  const posts = await fetchUserPosts(user.id);

  const fetcher: InfiniteScrollFetcher = async args => {
    'use server';
    return await fetchUserPosts(user.id, args.cursor);
  };

  return (
    <div className={styles.wrapper}>
      <PostList
        posts={posts}
        fetcher={fetcher}
      />
    </div>
  );
};

export default UserProfilePostsPage;

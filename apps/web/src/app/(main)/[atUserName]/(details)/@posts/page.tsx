import { notFound } from 'next/navigation';

import { fetchUserPosts } from './_actions/fetch-user-posts';
import * as styles from './page.css';
import { findUserByName } from '../../../../../repositories/user-repository';
import { PostList } from '../../../_components/post-list';
import { getUserName } from '../../_helpers/get-user-name';

import type { InfiniteScrollFetcher } from '../../../../../components/elements/infinite-scroll';
import type { FC } from 'react';

export type UserDetailsPostListPageProps = PageProps<'/[atUserName]'>;

const UserDetailsPostListPage: FC<UserDetailsPostListPageProps> = async ({
  params,
}) => {
  const { atUserName } = await params;
  const userName = getUserName(atUserName);
  if (!userName) return notFound();

  const user = await findUserByName(userName);
  if (!user) return notFound();

  const posts = await fetchUserPosts(user.id);

  const fetcher: InfiniteScrollFetcher = async (arguments_) => {
    'use server';
    return await fetchUserPosts(user.id, arguments_.cursor);
  };

  return (
    <section className={styles.wrapper}>
      <PostList
        posts={posts}
        fetcher={fetcher}
      />
    </section>
  );
};

export default UserDetailsPostListPage;

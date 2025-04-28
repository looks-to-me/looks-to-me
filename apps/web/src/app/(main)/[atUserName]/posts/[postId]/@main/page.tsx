import Image from 'next/image';
import { notFound } from 'next/navigation';

import * as styles from './page.css';
import { findPostById } from '../../../../../../repositories/post-repository';

import type { PageProps } from '../../../../../../types/page-props';
import type { UserPostDetailsPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserPostDetailsMainPageProps = UserPostDetailsPageProps & PageProps<{
  params: Promise<{
    // empty
  }>;
  searchParams: Promise<{
    // empty
  }>;
}>;

const UserPostDetailsMainPage: FC<UserPostDetailsMainPageProps> = async ({
  params,
}) => {
  const { postId } = await params;
  const post = await findPostById(postId);
  if (!post) return notFound();

  return (
    <section className={styles.wrapper}>
      <Image
        className={styles.image}
        src={`/images/posts/${post.id}`}
        alt={`Looks ${post.word} To Me`}
        sizes="80vw"
        fill
      />
    </section>
  );
};

export default UserPostDetailsMainPage;

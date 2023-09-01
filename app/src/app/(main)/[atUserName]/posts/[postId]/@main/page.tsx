import Image from 'next/image';
import { notFound } from 'next/navigation';

import * as styles from './page.css';
import { findPostById } from '../../../../_repositories/post-repository';

import type { PageProps } from '../../../../../_types/page-props';
import type { UserPostDetailsPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserPostDetailsMainPageProps = UserPostDetailsPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const UserPostDetailsMainPage: FC<UserPostDetailsMainPageProps> = async ({
  params,
}) => {
  const post = await findPostById(params.postId);
  if (!post) return notFound();
  
  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.image}
        src={`/images/posts/${post.id}`}
        alt={`Looks ${post.word} To Me`}
        objectFit="contain"
        sizes="80vw"
        fill
      />
    </div>
  );
};

export default UserPostDetailsMainPage;

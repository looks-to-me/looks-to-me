import Image from 'next/image';
import { notFound } from 'next/navigation';

import * as styles from './page.css';
import { findPostById } from '../../../../../_repositories/post-repository';

import type { PageProps } from '../../../../../../_types/page-props';
import type { ModalUserPostDetailsPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type ModalUserPostDetailsMainPageProps = ModalUserPostDetailsPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const ModalUserPostDetailsMainPage: FC<ModalUserPostDetailsMainPageProps> = async ({
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
        sizes="80vw"
        fill
      />
    </div>
  );
};

export default ModalUserPostDetailsMainPage;

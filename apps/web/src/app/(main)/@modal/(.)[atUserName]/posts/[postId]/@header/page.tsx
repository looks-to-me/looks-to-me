import Link from 'next/link';
import { notFound } from 'next/navigation';

import * as styles from './page.css';
import { getLoginUser } from '../../../../../../_actions/get-login-user';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../../_components/avatar';
import { publicEnv } from '../../../../../../_libs/env';
import { PostMenu } from '../../../../../_components/post-menu';
import { ShareButton } from '../../../../../_components/share-button';
import { findPostById } from '../../../../../_repositories/post-repository';
import { findUserById } from '../../../../../_repositories/user-repository';

import type { PageProps } from '../../../../../../_types/page-props';
import type { ModalUserPostDetailsPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type ModalUserPostDetailsHeaderPageProps = ModalUserPostDetailsPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const ModalUserPostDetailsHeaderPage: FC<ModalUserPostDetailsHeaderPageProps> = async ({
  params,
}) => {
  const post = await findPostById(params.postId);
  if (!post) return notFound();

  const user = await findUserById(post.userId);
  if (!user) return notFound();

  const loginUser = await getLoginUser();
  const isMyPost = post.userId === loginUser?.id;

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <Link href={`/@${user.profile.name}`}>
          <Avatar className={styles.avatar}>
            <AvatarImage
              src={`/images/avatars/${user.id}`}
              alt={user.profile.displayName ?? user.profile.name}
              sizes="32px"
            />
            <AvatarFallback>
              {user.profile.displayName ?? user.profile.name}
            </AvatarFallback>
          </Avatar>
        </Link>
        <h2 className={styles.title}>
          Looks {post.word} To Me
        </h2>
      </div>
      <div className={styles.toolbar}>
        <ShareButton text={`![LGTM](${publicEnv().NEXT_PUBLIC_APP_ORIGIN}/images/posts/${post.id})`} />
        {isMyPost && <PostMenu post={post} />}
      </div>
    </header>
  );
};

export default ModalUserPostDetailsHeaderPage;

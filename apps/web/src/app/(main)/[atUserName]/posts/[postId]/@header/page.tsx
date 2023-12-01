import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PostMenu } from './_components/post-menu';
import * as styles from './page.css';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../_components/avatar';
import { getUserMetadata } from '../../../../../_libs/auth/server/get-user-metadata';
import { publicEnv } from '../../../../../_libs/env';
import { ShareButton } from '../../../../_components/share-button';
import { findPostById } from '../../../../_repositories/post-repository';
import { findUserProviderByTypeAndSub } from '../../../../_repositories/user-provider-repository';
import { findUserById } from '../../../../_repositories/user-repository';

import type { PageProps } from '../../../../../_types/page-props';
import type { UserPostDetailsPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserPostDetailsHeaderPageProps = UserPostDetailsPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const UserPostDetailsHeaderPage: FC<UserPostDetailsHeaderPageProps> = async ({
  params,
}) => {
  const post = await findPostById(params.postId);
  if (!post) return notFound();

  const user = await findUserById(post.userId);
  if (!user) return notFound();
  
  const userMetadata = await getUserMetadata();
  const loginUser = await ( async () => {
    if (!userMetadata) return;
    const userProvider = await findUserProviderByTypeAndSub(userMetadata.provider, userMetadata.sub);
    if (!userProvider) return;
    return await findUserById(userProvider.userId);
  })();
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
        <ShareButton
          text={`![L${post.word.toUpperCase().at(0)}TM](${publicEnv().NEXT_PUBLIC_APP_ORIGIN}/images/posts/${post.id})`}
        />
        {isMyPost && <PostMenu post={post} />}
      </div>
    </header>
  );
};

export default UserPostDetailsHeaderPage;

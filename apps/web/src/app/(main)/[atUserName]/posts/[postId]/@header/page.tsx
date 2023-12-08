import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PostMenu } from './_components/post-menu';
import * as styles from './page.css';
import { getLoginUser } from '../../../../../_actions/get-login-user';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../_components/avatar';
import { publicEnv } from '../../../../../_libs/env';
import { ShareButton } from '../../../../_components/share-button';
import { findMuteUserByUserIdAndMuteUserId } from '../../../../_repositories/mute-user-repository';
import { findPostById } from '../../../../_repositories/post-repository';
import { findUserById } from '../../../../_repositories/user-repository';

import type { PostMenuProps } from './_components/post-menu';
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
  
  const loginUser = await getLoginUser();
  const isMuteUser = loginUser
    ? !!await findMuteUserByUserIdAndMuteUserId({
      userId: loginUser.id,
      muteUserId: post.userId,
    })
    : false;

  const postMenuProps: PostMenuProps = {
    post,
    postUser: user,
    loginUser,
    isMuteUser,
  };
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
        {loginUser && <PostMenu {...postMenuProps} />}
      </div>
    </header>
  );
};

export default UserPostDetailsHeaderPage;

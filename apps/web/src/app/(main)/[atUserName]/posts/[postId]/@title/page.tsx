import Link from 'next/link';
import { notFound } from 'next/navigation';

import * as styles from './page.css';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../../components/elements/avatar';
import { getLoginUser } from '../../../../../../queries/user/get-login-user';
import { findMuteUserByUserIdAndMuteUserId } from '../../../../../../repositories/mute-user-repository';
import { findPostById } from '../../../../../../repositories/post-repository';
import { findUserById } from '../../../../../../repositories/user-repository';
import { publicEnv } from '../../../../../_libs/env';
import { PostMenu } from '../../../../_components/post-menu';
import { ShareButton } from '../../../../_components/share-button';

import type { PageProps } from '../../../../../../types/page-props';
import type { UserPostDetailsPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserPostDetailsTitlePageProps = UserPostDetailsPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const UserPostDetailsTitlePage: FC<UserPostDetailsTitlePageProps> = async ({
  params,
}) => {
  const post = await findPostById(params.postId);
  if (!post) return notFound();

  const user = await findUserById(post.userId);
  if (!user) return notFound();
  
  const loginUser = await getLoginUser();
  const isMuteUser = loginUser
    ? !!await findMuteUserByUserIdAndMuteUserId(loginUser.id, post.userId)
    : false;

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
        {loginUser && (
          <PostMenu
            post={post}
            postUser={user}
            loginUser={loginUser}
            isMuteUser={isMuteUser}
          />
        )}
      </div>
    </header>
  );
};

export default UserPostDetailsTitlePage;

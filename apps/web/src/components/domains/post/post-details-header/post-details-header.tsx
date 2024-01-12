import Link from 'next/link';

import * as styles from './post-details-header.css';
import { PostMenu } from '../../../../app/(main)/_components/post-menu';
import { ShareButton } from '../../../../app/(main)/_components/share-button';
import { publicEnv } from '../../../../app/_libs/env';
import { Avatar, AvatarFallback, AvatarImage } from '../../../elements/avatar';

import type { Post } from '../../../../repositories/post-repository';
import type { User } from '../../../../repositories/user-repository';
import type { FC } from 'react';

export type PostDetailsHeaderProps = {
  postUser: User;
  post: Post;
  loginUser: User | undefined;
  isMuteUser: boolean;
};

export const PostDetailsHeader: FC<PostDetailsHeaderProps> = (props) => {
  const { loginUser, post, postUser } = props;
  const isMyPost = post.userId === loginUser?.id;
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <Link href={`/@${postUser.profile.name}`}>
          <Avatar className={styles.avatar}>
            <AvatarImage
              src={`/images/avatars/${postUser.id}`}
              alt={postUser.profile.displayName ?? postUser.profile.name}
              sizes="32px"
            />
            <AvatarFallback>
              {postUser.profile.displayName ?? postUser.profile.name}
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
        {isMyPost && (
          <PostMenu {...props} />
        )}
      </div>
    </header>
  );
};

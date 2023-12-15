import { clsx } from 'clsx';

import * as styles from './user-summary.css';
import { Avatar, AvatarFallback, AvatarImage } from '../../../elements/avatar';

import type { FC } from 'react';

export type UserSummaryProps = {
  className?: string;
  user: {
    id: string;
    profile: {
      name: string;
      displayName: string | null;
    };
  };
  numOfPosts: number;
};

export const UserSummary: FC<UserSummaryProps> = ({
  className,
  user,
  numOfPosts,
}) => {
  return (
    <div className={clsx(className, styles.wrapper)}>
      <Avatar className={styles.image}>
        <AvatarImage
          src={`/images/avatars/${user.id}`}
          alt={user.profile.displayName ?? user.profile.name}
          sizes="64px"
        />
        <AvatarFallback>
          {user.profile.displayName ?? user.profile.name}
        </AvatarFallback>
      </Avatar>
      <div className={styles.main}>
        <div className={styles.header}>
          <p className={styles.accountName}>{user.profile.name}</p>
          {user.profile.displayName && (
            <p className={styles.displayName}>{user.profile.displayName}</p>
          )}
        </div>
        <div className={styles.lower}>
          <p className={styles.numberOfPosts}>{`${numOfPosts} posts`}</p>
          <a href={`https://github.com/${user.profile.name}`} target="_blank">GitHub</a>
        </div>
      </div>
    </div>
  );
};

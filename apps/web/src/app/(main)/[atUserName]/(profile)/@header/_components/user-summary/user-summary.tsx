import clsx from 'clsx';

import * as styles from './user-summary.css';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../../_components/avatar';

import type { User } from '../../../../../_repositories/user-repository';
import type { FC } from 'react';

export type UserSummaryProps = {
  user: User;
  numOfPosts: number;
};

export const UserSummary: FC<UserSummaryProps> = ({
  user,
  numOfPosts,
}) => {
  return (
    <div className={clsx(styles.wrapper)}>
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
          <p className={styles.numOfPosts}>{`${numOfPosts} posts`}</p>
          <a href={`https://github.com/${user.profile.name}`} target="_blank">GitHub</a>
        </div>
      </div>
    </div>
  );
};

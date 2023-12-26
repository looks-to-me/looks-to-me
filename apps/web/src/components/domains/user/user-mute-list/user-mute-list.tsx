import { clsx } from 'clsx';

import { UserMuteListItem } from './user-mute-list-item';
import * as styles from './user-mute-list.css';

import type { FC } from 'react';

export type UserMuteListProps = {
  className?: string | undefined;
  users: {
    id: string;
    profile: {
      name: string;
      displayName: string | null;
    };
  }[];
};

export const UserMuteList: FC<UserMuteListProps> = ({
  className,
  users,
}) => {
  if (!users.length) {
    return (
      <div className={clsx(className, styles.notMutedWrapper)}>
        You haven&apos;t muted anyone yet.
      </div>
    );
  }

  return (
    <ul className={clsx(className, styles.mutedWrapper)}>
      {users.map((user) => (
        <UserMuteListItem key={user.id} user={user} />
      ))}
    </ul>
  );
};

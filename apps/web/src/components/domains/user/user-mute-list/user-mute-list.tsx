import { clsx } from 'clsx';

import * as styles from './user-mute-list.css';
import { UserMuteListItem } from '../user-mute-list-item';

import type { FC } from 'react';

export type UserMuteListProps = {
  className?: string | undefined;
  muteUsers: {
    id: string;
    profile: {
      name: string;
      displayName: string | null;
    };
  }[];
};

export const UserMuteList: FC<UserMuteListProps> = ({
  className,
  muteUsers,
}) => {
  if (!muteUsers.length) {
    return (
      <div className={clsx(className, styles.notMutedWrapper)}>
        You haven&apos;t muted anyone yet.
      </div>
    );
  }

  return (
    <ul className={clsx(className, styles.mutedWrapper)}>
      {muteUsers.map((user) => (
        <UserMuteListItem key={user.id} user={user} />
      ))}
    </ul>
  );
};

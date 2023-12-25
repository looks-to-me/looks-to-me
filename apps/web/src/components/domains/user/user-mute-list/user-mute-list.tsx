import { clsx } from 'clsx';

import * as styles from './user-mute-list.css';
import { UserMuteListItem } from '../user-mute-list-item';

import type { User } from '../../../../repositories/user-repository';
import type { FC } from 'react';

export type MuteUserListProps = {
  className?: string | undefined;
  muteUsers: User[];
};

export const UserMuteList: FC<MuteUserListProps> = ({
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

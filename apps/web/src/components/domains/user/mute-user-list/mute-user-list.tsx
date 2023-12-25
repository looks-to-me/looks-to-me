import { clsx } from 'clsx';

import * as styles from './mute-user-list.css';
import { MuteUserListItem } from '../mute-user-list-item';

import type { User } from '../../../../repositories/user-repository';
import type { FC } from 'react';

export type MuteUserListProps = {
  className?: string | undefined;
  muteUsers: User[];
};

export const MuteUserList: FC<MuteUserListProps> = ({
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
    <div className={clsx(className, styles.mutedWrapper)}>
      {muteUsers.map((user) => (
        <MuteUserListItem key={user.id} muteUser={user} />
      ))}
    </div>
  );
};

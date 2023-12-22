import { clsx } from 'clsx';

import { MuteUserListItem } from './mute-user-list-item';
import * as styles from './mute-user-list.css';

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
  if (!muteUsers.length){
    return (
      <div className={clsx(className, styles.wrapper)}>
        <p>You haven&apos;t muted anyone yet.</p>
        <p>Posts from accounts you mute will no longer be displayed.</p>
        <p>You can mute from the user&apos;s post page.</p>
      </div>
    );
  }

  return (
    <div className={clsx(className, styles.wrapper)}>
      {muteUsers.map((user) => (
        <MuteUserListItem key={user.id} muteUser={user} />
      ))}
    </div>
  );
};

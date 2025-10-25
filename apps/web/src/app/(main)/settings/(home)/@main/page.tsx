import * as styles from './page.css';
import { UserMuteList } from '../../../../../components/domains/user/user-mute-list';
import { getMutedUsers } from '../../../../../queries/user/get-muted-users';

import type { FC } from 'react';

export type SettingsHomeMainPageProps = PageProps<'/settings'>;

const SettingsHomeMainPage: FC<SettingsHomeMainPageProps> = async () => {
  const users = await getMutedUsers();

  return (
    <div className={styles.wrapper}>
      <h2>Muted Users</h2>
      <UserMuteList users={users} />
    </div>
  );
};

export default SettingsHomeMainPage;

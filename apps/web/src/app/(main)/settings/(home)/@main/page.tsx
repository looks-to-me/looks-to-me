import * as styles from './page.css';
import { UserMuteList } from '../../../../../components/domains/user/user-mute-list';
import { getMutedUsers } from '../../../../../queries/user/get-muted-users';

import type { PageProps } from '../../../../../types/page-props';
import type { SettingsHomePageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type SettingsHomeMainPageProps = SettingsHomePageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const SettingsHomeMainPage: FC<SettingsHomeMainPageProps> = async () => {
  const users = await getMutedUsers();
  
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Muted Users</h2>
      <UserMuteList users={users} />
    </div>
  );
};

export default SettingsHomeMainPage;

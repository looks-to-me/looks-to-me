import { getMuteUsers } from './get-mute-users';
import * as styles from './page.css';
import { MuteUserList } from '../../../../../components/domains/mute-user/mute-user-list';

import type { PageProps } from '../../../../../types/page-props';
import type { SettingsPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type HomePostListPageProps = SettingsPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const HomePostListPage: FC<HomePostListPageProps> = () => {
  const muteUsers = getMuteUsers();

  return (
    <div className={styles.wrapper}>
      <h2>Muted Users</h2>
      <MuteUserList
        muteUsers={muteUsers}
      />
    </div>
  );
};

export default HomePostListPage;

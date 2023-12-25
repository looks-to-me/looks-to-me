import { demoMuteUsers } from './demo-mute-users';
import * as styles from './page.css';
import { MuteUserList } from '../../../../../components/domains/mute-user/mute-user-list';

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

const SettingsHomeMainPage: FC<SettingsHomeMainPageProps> = () => {
  return (
    <div className={styles.wrapper}>
      {/* TODO: Add SettingTitle Component. */}
      <MuteUserList muteUsers={demoMuteUsers} />
    </div>
  );
};

export default SettingsHomeMainPage;

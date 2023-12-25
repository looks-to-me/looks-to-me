import * as styles from './page.css';
import { MuteUserList } from '../../../../../components/domains/user/mute-user-list';

import type { User } from '../../../../../repositories/user-repository';
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

const demoMuteUsers: User[] = [
  {
    id: '1',
    profile: {
      avatarUrl:
        'https://pbs.twimg.com/profile_images/1350895249678348292/RS1Aa0iK_400x400.jpg',
      displayName: '@drizzle',
      name: 'Drizzle',
    },
  },
  {
    id: '2',
    profile: {
      avatarUrl:
        'https://pbs.twimg.com/profile_images/1350895249678348292/RS1Aa0iK_400x400.jpg',
      displayName: '@drizzle',
      name: 'Drizzle',
    },
  },
  {
    id: '3',
    profile: {
      avatarUrl:
        'https://pbs.twimg.com/profile_images/1350895249678348292/RS1Aa0iK_400x400.jpg',
      displayName: '@drizzle',
      name: 'Drizzle',
    },
  },
];

const SettingsHomeMainPage: FC<SettingsHomeMainPageProps> = () => {
  return (
    <div className={styles.wrapper}>
      {/* TODO: Add SettingTitle Component. */}
      <MuteUserList muteUsers={demoMuteUsers} />
    </div>
  );
};

export default SettingsHomeMainPage;

import { redirect } from 'next/navigation';

import * as styles from './page.css';
import { UserMuteList } from '../../../../../components/domains/user/user-mute-list';
import { getLoginUser } from '../../../../../queries/user/get-login-user';
import { findMuteUsersByUserId } from '../../../../../repositories/mute-user-repository';
import { findUsersByIds } from '../../../../../repositories/user-repository';

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
  const loginUser = await getLoginUser();
  if (!loginUser) return redirect('/login');

  const muteUsers = await findMuteUsersByUserId(loginUser.id);
  const muteUserIds = muteUsers.map((muteUser) => muteUser.muteUserId);
  const users = muteUserIds.length ? await findUsersByIds(muteUserIds) : [];
  
  return (
    <div className={styles.wrapper}>
      {/* TODO: Add SettingTitle Component. */}
      <UserMuteList users={users} />
    </div>
  );
};

export default SettingsHomeMainPage;

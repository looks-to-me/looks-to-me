import { redirect } from 'next/navigation';

import { MuteUserList } from './_components/mute-user-list';
import { getMuteUsers } from './actions/get-mute-users-with-user-profile';
import { getLoginUser } from '../../../_actions/get-login-user';

import type { PageProps } from '../../../_types/page-props';
import type { FC } from 'react';

export const runtime = 'edge';

export type SettingPageProps = PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const MuteUserSettingPage: FC<SettingPageProps> = async () => {
  const user = await getLoginUser();
  if (!user) return redirect('/login');

  const muteUsers = getMuteUsers();
  return <MuteUserList muteUsers={muteUsers} />;
};

export default MuteUserSettingPage;

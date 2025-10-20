'use client';

import { useMount } from 'ahooks';
import { useRouter } from 'next/navigation';

import { dispatch } from '../../../helpers/dispatch';
import { createClient } from '../../_libs/auth/client/instance';

import type { FC } from 'react';

export type LogoutPageProps = PageProps<'/logout'>;

const LogoutPage: FC<LogoutPageProps> = () => {
  const router = useRouter();

  useMount(dispatch(async () => {
    const { error } = await createClient().auth.signOut();
    // TODO: error handling. show toast?
    if (error) console.error(error);

    router.back();
    router.refresh();
  }));

  return null;
};

export default LogoutPage;

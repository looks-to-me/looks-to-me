'use client';

import { useMount } from 'ahooks';
import { useRouter } from 'next/navigation';

import { dispatch } from '../../../helpers/dispatch';
import { supabase } from '../../_libs/auth/client/instance';

import type { PageProps } from '../../../types/page-props';
import type { LoginPageProps } from '../login/page';
import type { FC } from 'react';

export const runtime = 'edge';

export type LogoutPageProps = PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const LogoutPage: FC<LoginPageProps> = () => {
  const router = useRouter();

  useMount(dispatch(async () => {
    const { error } = await supabase.auth.signOut();
    // TODO: error handling. show toast?
    if (error) console.error(error);

    router.back();
    router.refresh();
  }));

  return null;
};

export default LogoutPage;

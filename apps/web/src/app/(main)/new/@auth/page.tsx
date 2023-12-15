'use client';

import { useMount } from 'ahooks';
import { useRouter } from 'next/navigation';

import { dispatch } from '../../../../helpers/dispatch';
import { getUserMetadata } from '../../../_libs/auth/server/get-user-metadata';

import type { PageProps } from '../../../_types/page-props';
import type { NewPostPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type NewPostAuthPageProps = NewPostPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const NewPostAuthPage: FC<NewPostAuthPageProps> = () => {
  const router = useRouter();

  useMount(dispatch(async () => {
    const userMetadata = await getUserMetadata();
    if (userMetadata) return;
    router.push('/login');
  }));
  
  return null;
};

export default NewPostAuthPage;

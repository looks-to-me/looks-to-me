'use client';

import { useMount } from 'ahooks';
import { useRouter } from 'next/navigation';

import { dispatch } from '../../../../_helpers/dispatch';
import { getUserMetadata } from '../../../../_libs/auth/server/get-user-metadata';

import type { FC } from 'react';

export const runtime = 'edge';

const PostsNewAuthPage: FC = () => {
  const router = useRouter();

  useMount(dispatch(async () => {
    const userMetadata = await getUserMetadata();
    if (userMetadata) return;
    router.push('/login');
  }));
  
  return null;
};

export default PostsNewAuthPage;

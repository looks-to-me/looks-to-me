import { PostList } from './_components/post-list';

import type { FC } from 'react';

export const runtime = 'edge';

const HomePostListPage: FC = () => {
  return (
    <PostList />
  );
};

export default HomePostListPage;

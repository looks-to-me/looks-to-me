import { PostCreateForm } from './_components/post-create-form';

import type { FC } from 'react';

export const runtime = 'edge';

const PostsNewPage: FC = () => {
  return (
    <PostCreateForm />
  );
};

export default PostsNewPage;

import { PostCreateForm } from './_components/post-create-form';

import type { FC } from 'react';

export const runtime = 'edge';

const PostsNewPage: FC = () => {
  return (
    <main>
      <PostCreateForm />
    </main>
  );
};

export default PostsNewPage;

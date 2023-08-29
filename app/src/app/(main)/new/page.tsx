import { PostCreateForm } from './_components/post-create-form';

import type { FC } from 'react';

export const runtime = 'edge';

const NewPostPage: FC = () => {
  return (
    <PostCreateForm />
  );
};

export default NewPostPage;

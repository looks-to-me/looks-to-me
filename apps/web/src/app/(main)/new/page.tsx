import { PostCreateForm } from './_components/post-create-form';

import type { FC } from 'react';

export type NewPostPageProps = PageProps<'/new'>;

const NewPostPage: FC<NewPostPageProps> = () => {
  return (
    <PostCreateForm />
  );
};

export default NewPostPage;

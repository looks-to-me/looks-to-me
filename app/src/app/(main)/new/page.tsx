import { PostCreateForm } from './_components/post-create-form';

import type { PageProps } from '../../_types/page-props';
import type { FC } from 'react';

export const runtime = 'edge';

export type NewPostPageProps = PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const NewPostPage: FC<NewPostPageProps> = () => {
  return (
    <PostCreateForm />
  );
};

export default NewPostPage;

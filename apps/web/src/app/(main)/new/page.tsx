import { redirect } from 'next/navigation';

import { PostCreateForm } from './_components/post-create-form';
import { graphqlExecutor } from '../../../graphql';
import { graphql } from '../../../graphql/generated';
import { createMetadata } from '../../../helpers/create-metadata';

import type { Metadata } from 'next';
import type { FC } from 'react';

const NewPostPageQuery = graphql(/** GraphQL */ `
  query NewPostPage {
    me {
      id
    }
  }
`);

export const metadata: Metadata = createMetadata({
  title: 'New post',
});

export type NewPostPageProps = PageProps<'/new'>;

const NewPostPage: FC<NewPostPageProps> = async () => {
  const data = await graphqlExecutor({ document: NewPostPageQuery });
  if (!data.me) {
    redirect('/login');
  }

  return (
    <PostCreateForm />
  );
};

export default NewPostPage;

import Link from 'next/link';

import { PostCreateForm } from './_components/post-create-form';
import { Button } from '../../../_components/button';
import { Header } from '../../_components/header';
import * as styles from '../../privacy/page.css';

import type { FC } from 'react';

export const runtime = 'edge';

const PostsNewPage: FC = () => {
  return (
    <>
      <Header>
        <Button className={styles.title} variant="ghost" size="medium" borderless asChild>
          <Link href="/posts/new">
            New post
          </Link>
        </Button>
      </Header>
      <main>
        <PostCreateForm />
      </main>
    </>
  );
};

export default PostsNewPage;

import Link from 'next/link';

import * as styles from './page.css';
import { Button } from '../../_components/button';
import { Header } from '../_components/header';

import type { FC } from 'react';

export const runtime = 'edge';

const HomePage: FC = () => {
  return (
    <Header>
      <Button className={styles.title} variant="ghost" size="medium" borderless asChild>
        <Link href="/">
          Home
        </Link>
      </Button>
    </Header>
  );
};

export default HomePage;

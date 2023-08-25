import Link from 'next/link';

import * as styles from './page.css';
import { Button } from '../../_components/button';
import { Header } from '../_components/header';

import type { FC } from 'react';

export const runtime = 'edge';

const ShufflePage: FC = () => {
  return (
    <Header>
      <Button className={styles.title} variant="ghost" size="medium" borderless asChild>
        <Link href="/shuffle">
          Shuffle
        </Link>
      </Button>
    </Header>
  );
};

export default ShufflePage;

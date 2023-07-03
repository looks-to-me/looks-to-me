import clsx from 'clsx';
import { Inter } from 'next/font/google';

import * as styles from './layout.css';

import 'modern-normalize';
import './_theme';

import type { FC, ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LooksToMe',
  robots: 'noindex',
};

export type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({
  children,
}) => {
  return (
    <html lang="ja">
      <body className={clsx(styles.body, inter.className)}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

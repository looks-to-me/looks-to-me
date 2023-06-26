import { Inter } from 'next/font/google';

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
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;

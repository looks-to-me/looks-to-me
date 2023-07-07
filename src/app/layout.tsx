import { NextAuthProvider } from './_components/next-auth-provider';
import { Root } from './_components/root';

import type { FC, ReactNode } from 'react';

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
      <body>
        <Root>
          <NextAuthProvider>{children}</NextAuthProvider>
        </Root>
      </body>
    </html>
  );
};

export default RootLayout;

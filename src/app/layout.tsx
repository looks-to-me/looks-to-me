import { ClerkProvider } from '@clerk/nextjs';

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
    <ClerkProvider>
      <html lang="ja">
        <body>
          <Root>
            {children}
          </Root>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;

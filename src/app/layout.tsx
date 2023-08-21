import { Root } from './_components/root';

import type { FC, ReactNode } from 'react';

export const metadata = {
  title: {
    template: '%s | LooksToMe',
    default: 'LooksToMe',
  },
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
          {children}
        </Root>
      </body>
    </html>
  );
};

export default RootLayout;

import { Root } from './_components/root';
import { env } from './_libs/env';

import type { FC, ReactNode } from 'react';

export const generateMetadata = () => {
  return {
    title: {
      template: '%s | LooksToMe',
      default: 'LooksToMe',
    },
    robots: 'noindex',
    metadataBase: env().NEXT_PUBLIC_APP_ORIGIN,
  };
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

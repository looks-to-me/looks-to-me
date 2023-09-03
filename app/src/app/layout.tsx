import { Root } from './_components/root';
import { createMetadata } from './_helpers/create-metadata';
import { env } from './_libs/env';

import type { FC, ReactNode } from 'react';

export const generateMetadata = () => {
  return createMetadata({
    metadataBase: new URL(env().NEXT_PUBLIC_APP_ORIGIN),
    title: {
      template: '%s | LooksToMe',
      default: 'LooksToMe',
    },
  });
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

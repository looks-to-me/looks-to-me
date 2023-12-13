import { publicEnv } from './_libs/env';
import { Root } from '../components/elements/root';
import { createMetadata } from '../helpers/create-metadata';

import type { FC, ReactNode } from 'react';

export const generateMetadata = () => {
  return createMetadata({
    metadataBase: new URL(publicEnv().NEXT_PUBLIC_APP_ORIGIN),
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

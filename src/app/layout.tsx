import { Root } from './_components/root';
import { getAuthUser } from './_libs/auth/server/get-auth-user';
import { upsertUser } from './upsert-user';

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

const RootLayout: FC<RootLayoutProps> = async ({
  children,
}) => {
  const authUser = await getAuthUser();
  if (authUser) {
    await upsertUser(authUser);
  }

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

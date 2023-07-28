import { Root } from './_components/root';
import { SupabaseClientSessionProvider } from './_libs/supabase/client-session-provider';

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
          <SupabaseClientSessionProvider>
            {children}
          </SupabaseClientSessionProvider>
        </Root>
      </body>
    </html>
  );
};

export default RootLayout;

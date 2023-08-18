import { Inter } from 'next/font/google';

import 'modern-normalize';
import './root.css';

import { SyncOAuthUser } from '../../(main)/_components/sync-o-auth-user';
import { SessionProvider } from '../../_libs/auth/client/session-provider';
import { Toaster } from '../toaster';
import { TooltipProvider } from '../tooltip';

import type { FC, ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export type RootProps = {
  children: ReactNode;
};

export const Root: FC<RootProps> = ({
  children,
}) => {
  return (
    <div className={inter.className}>
      <SessionProvider>
<<<<<<< HEAD
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <SyncOAuthUser />
=======
        <SyncOAuthUser>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </SyncOAuthUser>
>>>>>>> 92b7349 (upsert)
      </SessionProvider>
      <Toaster />
    </div>
  );
};

import { Inter } from 'next/font/google';

import { SyncOAuthUser } from '../../../../app/(main)/_components/sync-o-auth-user';
import { SessionProvider } from '../../../../app/_libs/auth/client/session-provider';
import { AlertDialogProvider } from '../../../elements/alert-dialog';
import { Toaster } from '../../../elements/toaster';
import { TooltipProvider } from '../../../elements/tooltip';

import 'modern-normalize';
import './application-root.css';

import type { FC, ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export type ApplicationRootProps = {
  children: ReactNode;
};

export const ApplicationRoot: FC<ApplicationRootProps> = ({
  children,
}) => {
  return (
    <div className={inter.className}>
      <SessionProvider>
        <TooltipProvider>
          <AlertDialogProvider>
            {children}
          </AlertDialogProvider>
        </TooltipProvider>
        <SyncOAuthUser />
      </SessionProvider>
      <Toaster />
    </div>
  );
};

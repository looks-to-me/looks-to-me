import { Inter } from 'next/font/google';

import 'modern-normalize';
import './root.css';

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
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </SessionProvider>
      <Toaster />
    </div>
  );
};

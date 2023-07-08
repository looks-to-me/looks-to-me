import { Inter } from 'next/font/google';

import 'modern-normalize';
import './root.css';

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
      {children}
    </div>
  );
};

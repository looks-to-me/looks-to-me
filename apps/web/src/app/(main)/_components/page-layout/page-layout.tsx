import clsx from 'clsx';

import * as styles from './page-layout.css';

import type { ReactNode , FC } from 'react';

export type PageLayoutProps = {
  className?: string | undefined;
  header: ReactNode;
  children: ReactNode;
};

export const PageLayout: FC<PageLayoutProps> = ({
  className,
  header,
  children,
}) => {
  return (
    <div className={clsx(className, styles.wrapper)}>
      {header}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

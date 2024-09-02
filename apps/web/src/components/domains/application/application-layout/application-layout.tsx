import { clsx } from 'clsx';

import * as styles from './application-layout.css';

import type { ReactNode, FC } from 'react';

export type ApplicationLayoutProps = {
  className?: string | undefined;
  header: ReactNode;
  children: ReactNode;
};

export const ApplicationLayout: FC<ApplicationLayoutProps> = ({
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

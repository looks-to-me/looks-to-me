import { clsx } from 'clsx';

import * as styles from './application-header.css';

import type { ComponentProps, FC } from 'react';

export type ApplicationHeaderProps = ComponentProps<'header'>;

export const ApplicationHeader: FC<ApplicationHeaderProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <header {...props} className={clsx(className, styles.header)}>
      {children}
    </header>
  );
};

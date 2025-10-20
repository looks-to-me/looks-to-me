'use client';

import { clsx } from 'clsx';

import * as styles from './alert-dialog.css';

import type { ComponentProps, FC } from 'react';

export type AlertDialogFooterProps = ComponentProps<'div'>;

export const AlertDialogFooter: FC<AlertDialogFooterProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={clsx(styles.footer, className)}>
      {children}
    </div>
  );
};

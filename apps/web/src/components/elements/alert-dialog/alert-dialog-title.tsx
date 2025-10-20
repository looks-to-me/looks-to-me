'use client';

import { clsx } from 'clsx';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import * as styles from './alert-dialog.css';

import type { ComponentProps, FC } from 'react';

export type AlertDialogTitleProps = ComponentProps<typeof AlertDialogPrimitive.Title>;

export const AlertDialogTitle: FC<AlertDialogTitleProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Title {...props} className={clsx(className, styles.title)}>
      {children}
    </AlertDialogPrimitive.Title>
  );
};

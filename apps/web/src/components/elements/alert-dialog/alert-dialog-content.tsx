'use client';

import { clsx } from 'clsx';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import * as styles from './alert-dialog.css';

import type { ComponentProps, FC } from 'react';

export type AlertDialogContentProps = ComponentProps<typeof AlertDialogPrimitive.Content>;

export const AlertDialogContent: FC<AlertDialogContentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className={styles.overlay} />
      <AlertDialogPrimitive.Content {...props} className={clsx(className, styles.content)}>
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  );
};

'use client';

import { clsx } from 'clsx';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import * as styles from './alert-dialog.css';

import type { ComponentProps, FC } from 'react';

export type AlertDialogDescriptionProps = ComponentProps<typeof AlertDialogPrimitive.Description>;

export const AlertDialogDescription: FC<AlertDialogDescriptionProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Description {...props} className={clsx(className, styles.description)}>
      {children}
    </AlertDialogPrimitive.Description>
  );
};

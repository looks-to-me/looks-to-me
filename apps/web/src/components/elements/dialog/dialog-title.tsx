'use client';

import { clsx } from 'clsx';
import { Dialog as DialogPrimitive } from 'radix-ui';

import * as styles from './dialog.css';

import type { ComponentProps, FC } from 'react';

export type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title>;

export const DialogTitle: FC<DialogTitleProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <DialogPrimitive.Title {...props} className={clsx(className, styles.title)}>
      {children}
    </DialogPrimitive.Title>
  );
};

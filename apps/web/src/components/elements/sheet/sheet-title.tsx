'use client';

import { clsx } from 'clsx';
import { Dialog as DialogPrimitive } from 'radix-ui';

import * as styles from './sheet.css';

import type { ComponentProps, FC } from 'react';

export type SheetTitleProps = ComponentProps<typeof DialogPrimitive.Title>;

export const SheetTitle: FC<SheetTitleProps> = ({
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

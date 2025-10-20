'use client';

import { clsx } from 'clsx';
import { Dialog as DialogPrimitive } from 'radix-ui';

import * as styles from './sheet.css';

import type { ComponentProps, FC } from 'react';

export type SheetDescriptionProps = ComponentProps<typeof DialogPrimitive.Description>;

export const SheetDescription: FC<SheetDescriptionProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <DialogPrimitive.Description {...props} className={clsx(className, styles.description)}>
      {children}
    </DialogPrimitive.Description>
  );
};

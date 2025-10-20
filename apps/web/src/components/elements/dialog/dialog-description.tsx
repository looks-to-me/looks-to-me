'use client';

import { clsx } from 'clsx';
import { Dialog as DialogPrimitive } from 'radix-ui';

import * as styles from './dialog.css';

import type { ComponentProps, FC } from 'react';

export type DialogDescriptionProps = ComponentProps<typeof DialogPrimitive.Description>;

export const DialogDescription: FC<DialogDescriptionProps> = ({
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

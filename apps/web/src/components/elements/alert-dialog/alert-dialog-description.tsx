'use client';

import { clsx } from 'clsx';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import { forwardRef } from 'react';

import * as styles from './alert-dialog.css';

import type { ComponentPropsWithoutRef, ElementRef, ForwardRefRenderFunction } from 'react';

export type AlertDialogDescriptionProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>;

const AlertDialogDescriptionRender: ForwardRefRenderFunction<ElementRef<typeof AlertDialogPrimitive.Description>, AlertDialogDescriptionProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <AlertDialogPrimitive.Description {...props} ref={ref} className={clsx(className, styles.description)}>
      {children}
    </AlertDialogPrimitive.Description>
  );
};

export const AlertDialogDescription = forwardRef(AlertDialogDescriptionRender);

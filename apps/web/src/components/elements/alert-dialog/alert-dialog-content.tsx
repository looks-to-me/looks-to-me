'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

import * as styles from './alert-dialog.css';

import type { ComponentPropsWithoutRef, ElementRef, ForwardRefRenderFunction } from 'react';

export type AlertDialogContentProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>;

const AlertDialogContentRender: ForwardRefRenderFunction<ElementRef<typeof AlertDialogPrimitive.Content>, AlertDialogContentProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className={styles.overlay} />
      <AlertDialogPrimitive.Content ref={ref} className={clsx(className, styles.content)} {...props}>
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  );
};

export const AlertDialogContent = forwardRef(AlertDialogContentRender);

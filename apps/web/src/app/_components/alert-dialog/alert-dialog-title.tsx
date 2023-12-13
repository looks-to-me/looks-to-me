'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

import * as styles from './alert-dialog.css';

import type { ComponentPropsWithoutRef, ElementRef, ForwardRefRenderFunction } from 'react';

export type AlertDialogTitleProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>;

const AlertDialogTitleRender: ForwardRefRenderFunction<ElementRef<typeof AlertDialogPrimitive.Title>, AlertDialogTitleProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <AlertDialogPrimitive.Title {...props} ref={ref} className={clsx(className, styles.title)}>
      {children}
    </AlertDialogPrimitive.Title>
  );
};

export const AlertDialogTitle = forwardRef(AlertDialogTitleRender);

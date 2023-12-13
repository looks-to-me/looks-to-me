'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

import * as styles from './dialog.css';

import type { ElementRef , ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type DialogTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

const DialogTitleRender: ForwardRefRenderFunction<ElementRef<typeof DialogPrimitive.Title>, DialogTitleProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <DialogPrimitive.Title {...props} ref={ref} className={clsx(className, styles.title)}>
      {children}
    </DialogPrimitive.Title>
  );
};

export const DialogTitle = forwardRef(DialogTitleRender);

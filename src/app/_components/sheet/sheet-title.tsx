'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from './sheet.css';

import type { ElementRef , ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type SheetTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

const SheetTitleRender: ForwardRefRenderFunction<ElementRef<typeof DialogPrimitive.Title>, SheetTitleProps> = ({
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

export const SheetTitle = forwardRef(SheetTitleRender);

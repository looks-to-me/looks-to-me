'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

import * as styles from './sheet.css';

import type { ElementRef , ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type SheetDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;

const SheetDescriptionRender: ForwardRefRenderFunction<ElementRef<typeof DialogPrimitive.Description>, SheetDescriptionProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <DialogPrimitive.Description {...props} ref={ref} className={clsx(className, styles.description)}>
      {children}
    </DialogPrimitive.Description>
  );
};

export const SheetDescription = forwardRef(SheetDescriptionRender);

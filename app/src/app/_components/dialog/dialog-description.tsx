'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from './dialog.css';

import type { ElementRef , ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type DialogDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;

const DialogDescriptionRender: ForwardRefRenderFunction<ElementRef<typeof DialogPrimitive.Description>, DialogDescriptionProps> = ({
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

export const DialogDescription = forwardRef(DialogDescriptionRender);

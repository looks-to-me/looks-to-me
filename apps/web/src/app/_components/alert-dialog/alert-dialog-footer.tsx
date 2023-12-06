'use client';

import { clsx } from 'clsx';
import { forwardRef } from 'react';

import * as styles from './alert-dialog.css';

import type { ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type AlertDialogDescriptionProps = ComponentPropsWithoutRef<'div'>;

const AlertDialogFooterRender: ForwardRefRenderFunction<HTMLDivElement, AlertDialogDescriptionProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div ref={ref} {...props} className={clsx(styles.footer, className)}>
      {children}
    </div>
  );
};

export const AlertDialogFooter = forwardRef(AlertDialogFooterRender);

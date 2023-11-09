'use client';

import * as DropDownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

import * as styles from './drop-down-menu.css';

import type { ElementRef , ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type DropDownMenuLabelProps = ComponentPropsWithoutRef<typeof DropDownMenuPrimitive.Label>;

const DropDownMenuLabelRender: ForwardRefRenderFunction<ElementRef<typeof DropDownMenuPrimitive.Label>, DropDownMenuLabelProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <DropDownMenuPrimitive.Label
      {...props}
      ref={ref}
      className={clsx(className, styles.label)}
    >
      {children}
    </DropDownMenuPrimitive.Label>
  );
};

export const DropDownMenuLabel = forwardRef(DropDownMenuLabelRender);

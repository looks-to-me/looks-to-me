'use client';

import { clsx } from 'clsx';
import { DropdownMenu as DropDownMenuPrimitive } from 'radix-ui';
import { forwardRef } from 'react';

import * as styles from './drop-down-menu.css';

import type { ElementRef, ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

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

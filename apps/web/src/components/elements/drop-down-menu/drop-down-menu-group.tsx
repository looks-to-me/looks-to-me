'use client';

import * as DropDownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

import * as styles from './drop-down-menu.css';

import type { ElementRef, ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type DropDownMenuGroupProps = ComponentPropsWithoutRef<typeof DropDownMenuPrimitive.Group>;

const DropDownMenuGroupRender: ForwardRefRenderFunction<ElementRef<typeof DropDownMenuPrimitive.Group>, DropDownMenuGroupProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <DropDownMenuPrimitive.Group
      {...props}
      ref={ref}
      className={clsx(className, styles.group)}
    >
      {children}
    </DropDownMenuPrimitive.Group>
  );
};

export const DropDownMenuGroup = forwardRef(DropDownMenuGroupRender);

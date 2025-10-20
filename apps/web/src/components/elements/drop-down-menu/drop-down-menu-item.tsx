'use client';

import { clsx } from 'clsx';
import { DropdownMenu as DropDownMenuPrimitive } from 'radix-ui';
import { forwardRef } from 'react';

import * as styles from './drop-down-menu.css';

import type { ElementRef, ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type DropDownMenuItemProps = ComponentPropsWithoutRef<typeof DropDownMenuPrimitive.Item>;

const DropDownMenuItemRender: ForwardRefRenderFunction<ElementRef<typeof DropDownMenuPrimitive.Item>, DropDownMenuItemProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <DropDownMenuPrimitive.Item
      {...props}
      ref={ref}
      className={clsx(className, styles.item)}
    >
      {children}
    </DropDownMenuPrimitive.Item>
  );
};

export const DropDownMenuItem = forwardRef(DropDownMenuItemRender);

'use client';

import * as DropDownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from './drop-down-menu.css';

import type { ElementRef , ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

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

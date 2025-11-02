'use client';

import { clsx } from 'clsx';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import * as styles from './dropdown-menu.css';

import type { ComponentProps, FC } from 'react';

export type DropdownMenuItemProps = ComponentProps<typeof DropdownMenuPrimitive.Item>;

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <DropdownMenuPrimitive.Item
      {...props}
      className={clsx(className, styles.item)}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
};

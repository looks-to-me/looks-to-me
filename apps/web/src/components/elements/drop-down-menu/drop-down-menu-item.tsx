'use client';

import { clsx } from 'clsx';
import { DropdownMenu as DropDownMenuPrimitive } from 'radix-ui';

import * as styles from './drop-down-menu.css';

import type { ComponentProps, FC } from 'react';

export type DropDownMenuItemProps = ComponentProps<typeof DropDownMenuPrimitive.Item>;

export const DropDownMenuItem: FC<DropDownMenuItemProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <DropDownMenuPrimitive.Item
      {...props}
      className={clsx(className, styles.item)}
    >
      {children}
    </DropDownMenuPrimitive.Item>
  );
};

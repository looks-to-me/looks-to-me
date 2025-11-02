'use client';

import { clsx } from 'clsx';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import * as styles from './dropdown-menu.css';

import type { ComponentProps, FC } from 'react';

export type DropdownMenuGroupProps = ComponentProps<typeof DropdownMenuPrimitive.Group>;

export const DropdownMenuGroup: FC<DropdownMenuGroupProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <DropdownMenuPrimitive.Group
      {...props}
      className={clsx(className, styles.group)}
    >
      {children}
    </DropdownMenuPrimitive.Group>
  );
};

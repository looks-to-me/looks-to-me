'use client';

import { clsx } from 'clsx';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import * as styles from './dropdown-menu.css';

import type { ComponentProps, FC } from 'react';

export type DropdownMenuLabelProps = ComponentProps<typeof DropdownMenuPrimitive.Label>;

export const DropdownMenuLabel: FC<DropdownMenuLabelProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <DropdownMenuPrimitive.Label
      {...props}
      className={clsx(className, styles.label)}
    >
      {children}
    </DropdownMenuPrimitive.Label>
  );
};

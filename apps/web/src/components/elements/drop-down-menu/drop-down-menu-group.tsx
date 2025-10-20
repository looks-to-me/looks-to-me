'use client';

import { clsx } from 'clsx';
import { DropdownMenu as DropDownMenuPrimitive } from 'radix-ui';

import * as styles from './drop-down-menu.css';

import type { ComponentProps, FC } from 'react';

export type DropDownMenuGroupProps = ComponentProps<typeof DropDownMenuPrimitive.Group>;

export const DropDownMenuGroup: FC<DropDownMenuGroupProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <DropDownMenuPrimitive.Group
      {...props}
      className={clsx(className, styles.group)}
    >
      {children}
    </DropDownMenuPrimitive.Group>
  );
};

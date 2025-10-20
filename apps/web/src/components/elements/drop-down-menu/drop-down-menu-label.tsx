'use client';

import { clsx } from 'clsx';
import { DropdownMenu as DropDownMenuPrimitive } from 'radix-ui';

import * as styles from './drop-down-menu.css';

import type { ComponentProps, FC } from 'react';

export type DropDownMenuLabelProps = ComponentProps<typeof DropDownMenuPrimitive.Label>;

export const DropDownMenuLabel: FC<DropDownMenuLabelProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <DropDownMenuPrimitive.Label
      {...props}
      className={clsx(className, styles.label)}
    >
      {children}
    </DropDownMenuPrimitive.Label>
  );
};

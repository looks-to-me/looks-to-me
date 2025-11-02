'use client';

import { clsx } from 'clsx';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import { Children } from 'react';

import * as styles from './dropdown-menu.css';
import { Separator } from '../separator';

import type { ComponentProps, FC } from 'react';

export type DropdownMenuContentProps = Omit<ComponentProps<typeof DropdownMenuPrimitive.Content>, 'sideOffset' | 'align'>;

export const DropdownMenuContent: FC<DropdownMenuContentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        {...props}
        align="end"
        sideOffset={4}
        className={clsx(className, styles.content)}
      >
        {Children.map(children, (child, index) => (
          <>
            {0 < index && <Separator />}
            {child}
          </>
        ))}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
};

'use client';

import { clsx } from 'clsx';
import { DropdownMenu as DropDownMenuPrimitive } from 'radix-ui';
import { Children } from 'react';

import * as styles from './drop-down-menu.css';
import { Separator } from '../separator';

import type { ComponentProps, FC } from 'react';

export type DropDownMenuContentProps = Omit<ComponentProps<typeof DropDownMenuPrimitive.Content>, 'sideOffset' | 'align'>;

export const DropDownMenuContent: FC<DropDownMenuContentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <DropDownMenuPrimitive.Portal>
      <DropDownMenuPrimitive.Content
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
      </DropDownMenuPrimitive.Content>
    </DropDownMenuPrimitive.Portal>
  );
};

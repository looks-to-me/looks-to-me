'use client';

import { clsx } from 'clsx';
import { Popover as PopoverPrimitive } from 'radix-ui';

import * as styles from './popover.css';

import type { ComponentProps, FC } from 'react';

export type PopoverContentProps = Omit<ComponentProps<typeof PopoverPrimitive.Content>, 'sideOffset' | 'align'>;

export const PopoverContent: FC<PopoverContentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        {...props}
        align="end"
        sideOffset={4}
        className={clsx(className, styles.content)}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};

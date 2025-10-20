'use client';

import { clsx } from 'clsx';
import { Popover as PopoverPrimitive } from 'radix-ui';
import { forwardRef } from 'react';

import * as styles from './popover.css';

import type { ElementRef, ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type PopoverContentProps = Omit<ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, 'sideOffset' | 'align'>;

const PopoverContentRender: ForwardRefRenderFunction<ElementRef<typeof PopoverPrimitive.Content>, PopoverContentProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        {...props}
        ref={ref}
        align="end"
        sideOffset={4}
        className={clsx(className, styles.content)}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};

export const PopoverContent = forwardRef(PopoverContentRender);

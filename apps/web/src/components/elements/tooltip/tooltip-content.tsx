'use client';

import { clsx } from 'clsx';
import { Tooltip as TooltipPrimitive } from 'radix-ui';

import * as styles from './tooltip.css';

import type { ComponentProps, FC } from 'react';

export type TooltipContentProps = Omit<ComponentProps<typeof TooltipPrimitive.Content>, 'sideOffset'>;

export const TooltipContent: FC<TooltipContentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        {...props}
        className={clsx(className, styles.content)}
        sideOffset={4}
      >
        {children}
        <TooltipPrimitive.Arrow />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
};

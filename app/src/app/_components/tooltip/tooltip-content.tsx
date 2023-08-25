'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from './tooltip.css';

import type { ElementRef , ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type TooltipContentProps = Omit<ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, 'sideOffset'>;

const TooltipContentRender: ForwardRefRenderFunction<ElementRef<typeof TooltipPrimitive.Content>, TooltipContentProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        {...props}
        ref={ref}
        className={clsx(className, styles.content)}
        sideOffset={4}
      >
        {children}
        <TooltipPrimitive.Arrow />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
};

export const TooltipContent = forwardRef(TooltipContentRender);

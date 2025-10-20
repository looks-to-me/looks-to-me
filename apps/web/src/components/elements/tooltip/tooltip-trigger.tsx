'use client';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

import type { FC, ReactNode } from 'react';

export type TooltipTriggerProps = {
  children: ReactNode;
};

export const TooltipTrigger: FC<TooltipTriggerProps> = ({
  children,
}) => {
  return (
    <TooltipPrimitive.Trigger asChild>
      {children}
    </TooltipPrimitive.Trigger>
  );
};

'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import type { FC } from 'react';

export type TooltipTriggerProps = {
  children: React.ReactNode;
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

'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';

import type { FC } from 'react';

export type PopoverTriggerProps = {
  children: React.ReactNode;
};

export const PopoverTrigger: FC<PopoverTriggerProps> = ({
  children,
}) => {
  return (
    <PopoverPrimitive.Trigger asChild>
      {children}
    </PopoverPrimitive.Trigger>
  );
};

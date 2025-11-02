'use client';

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { FC, ReactNode } from 'react';

export type DropdownMenuTriggerProps = {
  children: ReactNode;
};

export const DropdownMenuTrigger: FC<DropdownMenuTriggerProps> = ({
  children,
}) => {
  return (
    <DropdownMenuPrimitive.Trigger asChild>
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
};

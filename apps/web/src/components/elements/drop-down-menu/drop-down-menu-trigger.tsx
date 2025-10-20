'use client';

import { DropdownMenu as DropDownMenuPrimitive } from 'radix-ui';

import type { FC, ReactNode } from 'react';

export type DropDownMenuTriggerProps = {
  children: ReactNode;
};

export const DropDownMenuTrigger: FC<DropDownMenuTriggerProps> = ({
  children,
}) => {
  return (
    <DropDownMenuPrimitive.Trigger asChild>
      {children}
    </DropDownMenuPrimitive.Trigger>
  );
};

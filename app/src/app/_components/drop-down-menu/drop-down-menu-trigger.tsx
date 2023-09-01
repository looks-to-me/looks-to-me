'use client';

import * as DropDownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import type { FC } from 'react';

export type DropDownMenuTriggerProps = {
  children: React.ReactNode;
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

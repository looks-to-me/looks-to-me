'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import type { FC, ReactNode } from 'react';

export type SheetTriggerProps = {
  children: ReactNode;
};

export const SheetTrigger: FC<SheetTriggerProps> = ({
  children,
}) => {
  return (
    <DialogPrimitive.Trigger asChild>
      {children}
    </DialogPrimitive.Trigger>
  );
};

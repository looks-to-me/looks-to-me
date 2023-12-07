'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

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

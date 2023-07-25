'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import type { FC } from 'react';

export type SheetTriggerProps = {
  children: React.ReactNode;
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

'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import type { FC, ReactNode } from 'react';

export type SheetCloseProps = {
  children: ReactNode;
};

export const SheetClose: FC<SheetCloseProps> = ({
  children,
}) => {
  return (
    <DialogPrimitive.Close asChild>
      {children}
    </DialogPrimitive.Close>
  );
};

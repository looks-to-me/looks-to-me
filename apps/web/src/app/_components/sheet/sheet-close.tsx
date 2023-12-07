'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

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

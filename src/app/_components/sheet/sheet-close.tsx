'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import type { FC } from 'react';

export type SheetCloseProps = {
  children: React.ReactNode;
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

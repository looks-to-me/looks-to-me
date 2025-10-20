'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import type { FC, ReactNode } from 'react';

export type DialogCloseProps = {
  children: ReactNode;
};

export const DialogClose: FC<DialogCloseProps> = ({
  children,
}) => {
  return (
    <DialogPrimitive.Close asChild>
      {children}
    </DialogPrimitive.Close>
  );
};

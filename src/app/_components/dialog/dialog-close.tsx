'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import type { FC } from 'react';

export type DialogCloseProps = {
  children: React.ReactNode;
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

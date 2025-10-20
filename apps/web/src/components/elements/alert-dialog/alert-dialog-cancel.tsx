'use client';

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { FC, ReactNode } from 'react';

export type AlertDialogCancelProps = {
  children: ReactNode;
};

export const AlertDialogCancel: FC<AlertDialogCancelProps> = ({
  children,
}) => {
  return (
    <AlertDialogPrimitive.Cancel asChild>
      {children}
    </AlertDialogPrimitive.Cancel>
  );
};

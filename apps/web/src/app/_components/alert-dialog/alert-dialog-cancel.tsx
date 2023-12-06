'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import type { FC } from 'react';

export type AlertDialogCancelProps = {
  children: React.ReactNode;
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

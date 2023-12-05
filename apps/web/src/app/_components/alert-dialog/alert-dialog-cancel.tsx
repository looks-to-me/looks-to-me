'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import type { ComponentPropsWithoutRef, FC } from 'react';

export type AlertDialogCancelProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>;

export const AlertDialogCancel: FC<AlertDialogCancelProps> = ({
  children,
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Cancel {...props} asChild>
      {children}
    </AlertDialogPrimitive.Cancel>
  );
};

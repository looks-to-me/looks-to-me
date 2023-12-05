'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import type { ComponentPropsWithoutRef, FC } from 'react';

export type AlertDialogCancelProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>;

export const AlertDialogCancel: FC<AlertDialogCancelProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Cancel {...props} className={className} asChild>
      {children}
    </AlertDialogPrimitive.Cancel>
  );
};

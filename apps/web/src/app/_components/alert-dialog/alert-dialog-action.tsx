'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import type { ComponentPropsWithoutRef, FC } from 'react';

export type AlertDialogActionProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>;

export const AlertDialogAction: FC<AlertDialogActionProps> = ({
  children,
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Action {...props} asChild>
      {children}
    </AlertDialogPrimitive.Action>
  );
};

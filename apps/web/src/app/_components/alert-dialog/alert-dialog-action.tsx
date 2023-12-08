'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import type { FC, ReactNode } from 'react';

export type AlertDialogActionProps = {
  children: ReactNode;
};

export const AlertDialogAction: FC<AlertDialogActionProps> = ({
  children,
}) => {
  return (
    <AlertDialogPrimitive.Action asChild>
      {children}
    </AlertDialogPrimitive.Action>
  );
};

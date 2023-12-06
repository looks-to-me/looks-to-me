'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import type { FC } from 'react';

export type AlertDialogActionProps = {
  children: React.ReactNode;
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

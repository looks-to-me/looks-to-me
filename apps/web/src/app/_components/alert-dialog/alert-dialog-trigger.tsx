'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import type { FC, ReactNode } from 'react';

export type AlertDialogTriggerProps = {
  children: ReactNode;
};

export const AlertDialogTrigger: FC<AlertDialogTriggerProps> = ({
  children,
}) => {
  return (
    <AlertDialogPrimitive.Trigger asChild>
      {children}
    </AlertDialogPrimitive.Trigger>
  );
};

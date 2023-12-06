'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import type { FC } from 'react';

export type AlertDialogTriggerProps = {
  children: React.ReactNode;
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

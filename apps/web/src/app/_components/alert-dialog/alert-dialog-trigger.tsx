'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import type { ComponentPropsWithoutRef, FC } from 'react';

export type AlertDialogTriggerProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>;

export const AlertDialogTrigger: FC<AlertDialogTriggerProps> = ({
  children,
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Trigger {...props} asChild>
      {children}
    </AlertDialogPrimitive.Trigger>
  );
};

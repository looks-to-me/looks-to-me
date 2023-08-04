'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import type { FC } from 'react';

export type DialogTriggerProps = {
  children: React.ReactNode;
};

export const DialogTrigger: FC<DialogTriggerProps> = ({
  children,
}) => {
  return (
    <DialogPrimitive.Trigger asChild>
      {children}
    </DialogPrimitive.Trigger>
  );
};

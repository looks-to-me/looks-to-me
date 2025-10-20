'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import type { FC, ReactNode } from 'react';

export type DialogTriggerProps = {
  children: ReactNode;
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

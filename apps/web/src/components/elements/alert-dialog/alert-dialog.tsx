'use client';

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export type AlertDialogProps = ComponentProps<typeof AlertDialogPrimitive.Root>;

export const AlertDialog = AlertDialogPrimitive.Root;

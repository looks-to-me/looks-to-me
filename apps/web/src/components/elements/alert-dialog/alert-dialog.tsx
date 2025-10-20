'use client';

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { ComponentPropsWithoutRef } from 'react';

export type AlertDialogProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>;

export const AlertDialog = AlertDialogPrimitive.Root;

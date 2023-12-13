'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import type { ComponentPropsWithoutRef } from 'react';

export type AlertDialogProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>;

export const AlertDialog = AlertDialogPrimitive.Root;

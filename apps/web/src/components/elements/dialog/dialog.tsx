'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import type { ComponentPropsWithoutRef } from 'react';

export type DialogProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

export const Dialog = DialogPrimitive.Root;

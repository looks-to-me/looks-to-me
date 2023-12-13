'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import type { ComponentPropsWithoutRef } from 'react';

export type SheetProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

export const Sheet = DialogPrimitive.Root;

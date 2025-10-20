'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import type { ComponentPropsWithoutRef } from 'react';

export type SheetProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

export const Sheet = DialogPrimitive.Root;

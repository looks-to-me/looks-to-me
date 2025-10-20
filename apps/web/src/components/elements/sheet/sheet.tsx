'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export type SheetProps = ComponentProps<typeof DialogPrimitive.Root>;

export const Sheet = DialogPrimitive.Root;

'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export type DialogProps = ComponentProps<typeof DialogPrimitive.Root>;

export const Dialog = DialogPrimitive.Root;

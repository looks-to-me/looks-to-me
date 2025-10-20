'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import type { ComponentPropsWithoutRef } from 'react';

export type DialogProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

export const Dialog = DialogPrimitive.Root;

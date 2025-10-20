'use client';

import { VisuallyHidden as VisuallyHiddenPrimitive } from 'radix-ui';

import type { ComponentPropsWithoutRef } from 'react';

export type VisuallyHiddenProps = ComponentPropsWithoutRef<typeof VisuallyHiddenPrimitive.Root>;

export const VisuallyHidden = VisuallyHiddenPrimitive.Root;

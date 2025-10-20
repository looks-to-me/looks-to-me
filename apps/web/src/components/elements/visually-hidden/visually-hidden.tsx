'use client';

import { VisuallyHidden as VisuallyHiddenPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export type VisuallyHiddenProps = ComponentProps<typeof VisuallyHiddenPrimitive.Root>;

export const VisuallyHidden = VisuallyHiddenPrimitive.Root;

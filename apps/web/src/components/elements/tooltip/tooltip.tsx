'use client';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root>;

export const Tooltip = TooltipPrimitive.Root;

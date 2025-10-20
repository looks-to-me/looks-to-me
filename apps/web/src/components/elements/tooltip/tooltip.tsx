'use client';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

import type { ComponentPropsWithoutRef } from 'react';

export type TooltipProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>;

export const Tooltip = TooltipPrimitive.Root;

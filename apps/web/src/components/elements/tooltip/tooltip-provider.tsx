'use client';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export type TooltipProviderProps = ComponentProps<typeof TooltipPrimitive.Provider>;

export const TooltipProvider = TooltipPrimitive.Provider;

'use client';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

import type { ComponentPropsWithoutRef } from 'react';

export type TooltipProviderProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>;

export const TooltipProvider = TooltipPrimitive.Provider;

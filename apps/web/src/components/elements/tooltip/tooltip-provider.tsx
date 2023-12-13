'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import type { ComponentPropsWithoutRef } from 'react';

export type TooltipProviderProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>;

export const TooltipProvider = TooltipPrimitive.Provider;

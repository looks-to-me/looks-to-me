'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import type { ComponentPropsWithoutRef } from 'react';

export type TooltipProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>;

export const Tooltip = TooltipPrimitive.Root;

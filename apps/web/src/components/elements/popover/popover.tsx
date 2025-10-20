'use client';

import { Popover as PopoverPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export type PopoverProps = ComponentProps<typeof PopoverPrimitive.Root>;

export const Popover = PopoverPrimitive.Root;

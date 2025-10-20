'use client';

import { Popover as PopoverPrimitive } from 'radix-ui';

import type { ComponentPropsWithoutRef } from 'react';

export type PopoverProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;

export const Popover = PopoverPrimitive.Root;

'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';

import type { ComponentPropsWithoutRef } from 'react';

export type PopoverProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;

export const Popover = PopoverPrimitive.Root;

'use client';

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export type DropdownMenuProps = ComponentProps<typeof DropdownMenuPrimitive.Root>;

export const DropdownMenu = DropdownMenuPrimitive.Root;

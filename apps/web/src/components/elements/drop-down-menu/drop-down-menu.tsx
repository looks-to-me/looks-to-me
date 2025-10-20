'use client';

import { DropdownMenu as DropDownMenuPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export type DropDownMenuProps = ComponentProps<typeof DropDownMenuPrimitive.Root>;

export const DropDownMenu = DropDownMenuPrimitive.Root;

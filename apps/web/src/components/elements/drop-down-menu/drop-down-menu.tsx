'use client';

import { DropdownMenu as DropDownMenuPrimitive } from 'radix-ui';

import type { ComponentPropsWithoutRef } from 'react';

export type DropDownMenuProps = ComponentPropsWithoutRef<typeof DropDownMenuPrimitive.Root>;

export const DropDownMenu = DropDownMenuPrimitive.Root;

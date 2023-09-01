'use client';

import * as DropDownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import type { ComponentPropsWithoutRef } from 'react';

export type DropDownMenuProps = ComponentPropsWithoutRef<typeof DropDownMenuPrimitive.Root>;

export const DropDownMenu = DropDownMenuPrimitive.Root;

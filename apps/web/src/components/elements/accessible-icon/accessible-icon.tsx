'use client';

import { AccessibleIcon as AccessibleIconPrimitive } from 'radix-ui';

import type { ComponentPropsWithoutRef } from 'react';

export type AccessibleIconProps = ComponentPropsWithoutRef<typeof AccessibleIconPrimitive.Root>;

export const AccessibleIcon = AccessibleIconPrimitive.Root;

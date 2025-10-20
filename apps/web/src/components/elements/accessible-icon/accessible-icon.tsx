'use client';

import { AccessibleIcon as AccessibleIconPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export type AccessibleIconProps = ComponentProps<typeof AccessibleIconPrimitive.Root>;

export const AccessibleIcon = AccessibleIconPrimitive.Root;

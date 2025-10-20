'use client';

import { AspectRatio as AspectRatioPrimitive } from 'radix-ui';

import type { ComponentPropsWithoutRef } from 'react';

export type AspectRatioProps = ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>;

export const AspectRatio = AspectRatioPrimitive.Root;

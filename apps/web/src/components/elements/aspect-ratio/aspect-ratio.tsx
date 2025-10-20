'use client';

import { AspectRatio as AspectRatioPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export type AspectRatioProps = ComponentProps<typeof AspectRatioPrimitive.Root>;

export const AspectRatio = AspectRatioPrimitive.Root;

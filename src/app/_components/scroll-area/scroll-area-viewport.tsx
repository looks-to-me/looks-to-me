'use client';

import { Viewport } from '@radix-ui/react-scroll-area';

import type { ComponentPropsWithoutRef } from 'react';

export type ScrollAreaViewportProps = ComponentPropsWithoutRef<typeof Viewport>;

export const ScrollAreaViewport = Viewport;

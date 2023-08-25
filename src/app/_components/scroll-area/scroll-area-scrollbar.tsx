'use client';

import { Scrollbar } from '@radix-ui/react-scroll-area';

import type { ComponentPropsWithoutRef } from 'react';

export type ScrollAreaScrollbarProps = ComponentPropsWithoutRef<typeof Scrollbar>;

export const ScrollAreaScrollbar = Scrollbar;

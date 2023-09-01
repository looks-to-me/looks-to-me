import type { ReactNode } from 'react';

export type LayoutProps<
  Slots extends Record<string, ReactNode> = Record<string, never>,
> = Slots & { children: ReactNode };

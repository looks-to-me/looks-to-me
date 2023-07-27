import * as VisuallyHiddenPrimitive from '@radix-ui/react-visually-hidden';

import type { ComponentPropsWithoutRef } from 'react';

export type VisuallyHiddenProps = ComponentPropsWithoutRef<typeof VisuallyHiddenPrimitive.Root>;

export const VisuallyHidden = VisuallyHiddenPrimitive.Root;

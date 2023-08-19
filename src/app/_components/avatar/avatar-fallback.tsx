'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from './avatar.css';

import type { ComponentPropsWithoutRef, ElementRef, ForwardRefRenderFunction } from 'react';

export type AvatarFallbackProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;

const AvatarFallbackRender: ForwardRefRenderFunction<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
  >
= (({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={clsx(
      className,
      styles.fallback,
    )}
    {...props}
  />
));

export const AvatarFallback = forwardRef(AvatarFallbackRender);

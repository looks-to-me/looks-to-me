'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

import * as styles from './avatar.css';

import type { ComponentPropsWithoutRef, ElementRef, ForwardRefRenderFunction } from 'react';

export type AvatarFallbackProps = Omit<ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>, 'children'> & {
  children: string;
};

const AvatarFallbackRender: ForwardRefRenderFunction<ElementRef<typeof AvatarPrimitive.Fallback>, AvatarFallbackProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <AvatarPrimitive.Fallback
      {...props}
      ref={ref}
      className={clsx(className, styles.fallback)}
    >
      {children.at(0)?.toUpperCase() ?? ''}
    </AvatarPrimitive.Fallback>
  );
};

export const AvatarFallback = forwardRef(AvatarFallbackRender);

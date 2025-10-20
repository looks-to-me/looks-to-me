'use client';

import { clsx } from 'clsx';
import { Avatar as AvatarPrimitive } from 'radix-ui';
import { forwardRef } from 'react';

import * as styles from './avatar.css';

import type { ComponentPropsWithoutRef, ElementRef, ForwardRefRenderFunction } from 'react';

export type AvatarProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

const AvatarRender: ForwardRefRenderFunction<ElementRef<typeof AvatarPrimitive.Root>, AvatarProps> = ({
  className,
  ...props
}, ref) => {
  return (
    <AvatarPrimitive.Root
      {...props}
      ref={ref}
      className={clsx(className, styles.wrapper)}
    />
  );
};

export const Avatar = forwardRef(AvatarRender);

'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from './avatar.css';

import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardRefRenderFunction,
} from 'react';

export type AvatarProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

const AvatarRender: ForwardRefRenderFunction<
  ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
> = ({ className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={clsx(className, styles.wrapper)}
      {...props}
    />
  );
};

export const Avatar = forwardRef(AvatarRender);

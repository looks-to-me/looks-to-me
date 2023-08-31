'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from './avatar.css';

import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardRefRenderFunction,
} from 'react';

export type AvatarProps = {
  size?: number;
} & ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

const AvatarRender: ForwardRefRenderFunction<
  ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
> = ({ className, size = 2, ...props }, ref) => {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      style={assignInlineVars({ [styles.size]: size.toString() })}
      className={clsx(className, styles.wrapper)}
      {...props}
    />
  );
};

export const Avatar = forwardRef(AvatarRender);

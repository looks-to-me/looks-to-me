'use client';

import { clsx } from 'clsx';
import { Avatar as AvatarPrimitive } from 'radix-ui';

import * as styles from './avatar.css';

import type { ComponentProps, FC } from 'react';

export type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root>;

export const Avatar: FC<AvatarProps> = ({
  className,
  ...props
}) => {
  return (
    <AvatarPrimitive.Root
      {...props}
      className={clsx(className, styles.wrapper)}
    />
  );
};

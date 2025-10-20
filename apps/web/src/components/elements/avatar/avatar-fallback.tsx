'use client';

import { clsx } from 'clsx';
import { Avatar as AvatarPrimitive } from 'radix-ui';

import * as styles from './avatar.css';

import type { ComponentProps, FC } from 'react';

export type AvatarFallbackProps = Omit<ComponentProps<typeof AvatarPrimitive.Fallback>, 'children'> & {
  children: string;
};

export const AvatarFallback: FC<AvatarFallbackProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <AvatarPrimitive.Fallback
      {...props}
      className={clsx(className, styles.fallback)}
    >
      {children.at(0)?.toUpperCase() ?? ''}
    </AvatarPrimitive.Fallback>
  );
};

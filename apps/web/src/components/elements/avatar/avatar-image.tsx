'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { clsx } from 'clsx';
import Image from 'next/image';
import { forwardRef } from 'react';

import * as styles from './avatar.css';

import type { ComponentPropsWithoutRef, ComponentRef, ForwardRefRenderFunction } from 'react';

export type AvatarImageProps = Omit<ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>, 'src'> & {
  src?: string | undefined;
};

const AvatarImageRender: ForwardRefRenderFunction<ComponentRef<typeof AvatarPrimitive.Image>, AvatarImageProps> = ({
  className,
  ...props
}, ref) => {
  const hasImage = !!props.src && !!props.alt;

  return (
    <AvatarPrimitive.Image
      {...props}
      ref={ref}
      className={clsx(className, styles.image)}
      asChild={hasImage}
    >
      {hasImage && (
        <Image src={props.src!} alt={props.alt!} fill />
      )}
    </AvatarPrimitive.Image>
  );
};

export const AvatarImage = forwardRef(AvatarImageRender);

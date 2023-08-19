'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import clsx from 'clsx';
import Image from 'next/image';
import { forwardRef } from 'react';

import * as styles from './avatar.css';

import type { ElementRef, ForwardRefRenderFunction } from 'react';

export type AvatarImageProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
>;

const AvatarImageRender: ForwardRefRenderFunction<
  ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
> = ({ className, ...props }, ref) => {
  return (
    // use next/image when src and alt are provided
    <AvatarPrimitive.Image
      ref={ref}
      className={clsx(className, styles.image)}
      {...props}
      asChild={props.src !== undefined && props.alt !== undefined}
    >
      {props.src !== undefined && props.alt !== undefined && (
        <Image src={props.src} alt={props.alt} sizes={'16rem'} fill />
      )}
    </AvatarPrimitive.Image>
  );
};

export const AvatarImage = forwardRef(AvatarImageRender);

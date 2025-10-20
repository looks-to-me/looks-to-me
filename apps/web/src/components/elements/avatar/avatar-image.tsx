'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import { Avatar as AvatarPrimitive } from 'radix-ui';

import * as styles from './avatar.css';

import type { ComponentProps, FC } from 'react';

export type AvatarImageProps = Omit<ComponentProps<typeof AvatarPrimitive.Image>, 'src'> & {
  src?: string | undefined;
};

export const AvatarImage: FC<AvatarImageProps> = ({
  className,
  ...props
}) => {
  const hasImage = !!props.src && !!props.alt;

  return (
    <AvatarPrimitive.Image
      {...props}
      className={clsx(className, styles.image)}
      asChild={hasImage}
    >
      {hasImage && (
        <Image src={props.src!} alt={props.alt!} fill />
      )}
    </AvatarPrimitive.Image>
  );
};

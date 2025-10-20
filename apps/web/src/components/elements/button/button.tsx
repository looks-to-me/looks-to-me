import { clsx } from 'clsx';
import { Slot as SlotPrimitive } from 'radix-ui';

import * as styles from './button.css';

import type { RecipeVariants } from '@vanilla-extract/recipes';
import type { ComponentProps, FC } from 'react';

type ButtonVariants = NonNullable<RecipeVariants<typeof styles.wrapper>>;

export type ButtonVariant = Exclude<ButtonVariants['variant'], undefined>;

export type ButtonSize = Exclude<ButtonVariants['size'], undefined>;

export type ButtonBorderless = Exclude<ButtonVariants['borderless'], undefined>;

export type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant | undefined;
  borderless?: ButtonBorderless | undefined;
  size?: ButtonSize | undefined;
  asChild?: boolean | undefined;
};

export const Button: FC<ButtonProps> = ({
  className,
  children,
  variant = 'normal',
  borderless = false,
  size = 'normal',
  asChild,
  ...props
}) => {
  const Wrapper = asChild ? SlotPrimitive.Slot : 'button';

  return (
    <Wrapper
      {...props}
      className={clsx(className, styles.wrapper({ variant, borderless, size }))}
    >
      {children}
    </Wrapper>
  );
};

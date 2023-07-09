import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from './button.css';

import type { RecipeVariants } from '@vanilla-extract/recipes';
import type { ForwardRefRenderFunction , ComponentPropsWithoutRef } from 'react';

type ButtonVariants = NonNullable<RecipeVariants<typeof styles.wrapper>>;

export type ButtonVariant = Exclude<ButtonVariants['variant'], undefined>;

export type ButtonSize = Exclude<ButtonVariants['size'], undefined>;

export type ButtonBorderless = Exclude<ButtonVariants['borderless'], undefined>;

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: ButtonVariant | undefined;
  borderless?: ButtonBorderless | undefined;
  size?: ButtonSize | undefined;
  asChild?: boolean | undefined;
};

const ButtonRender: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = ({
  className,
  children,
  variant = 'normal',
  borderless = false,
  size = 'normal',
  asChild,
  ...props
}, ref) => {
  const Wrapper = asChild ? Slot : 'button';

  return (
    <Wrapper
      {...props}
      ref={ref}
      className={clsx(className, styles.wrapper({ variant, borderless, size }))}
    >
      {children}
    </Wrapper>
  );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(ButtonRender);

import { clsx } from 'clsx';

import * as styles from './application-header-banner.css';

import type { RecipeVariants } from '@vanilla-extract/recipes';
import type { ComponentPropsWithoutRef, FC } from 'react';

type ApplicationHeaderBannerVariants = NonNullable<
  RecipeVariants<typeof styles.wrapper>
>;

export type ApplicationHeaderBannerProps = ComponentPropsWithoutRef<'div'> &
ApplicationHeaderBannerVariants;

export const ApplicationHeaderBanner: FC<ApplicationHeaderBannerProps> = ({
  variant = 'warning',
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={clsx(className, styles.wrapper({ variant }))}>
      {children}
    </div>
  );
};

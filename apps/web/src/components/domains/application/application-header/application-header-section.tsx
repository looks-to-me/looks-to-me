import { clsx } from 'clsx';

import * as styles from './application-header.css';

import type { RecipeVariants } from '@vanilla-extract/recipes';
import type { ComponentProps, FC } from 'react';

type ApplicationHeaderSectionVariants = NonNullable<RecipeVariants<typeof styles.section>>;

export type ApplicationHeaderSectionAlign = Exclude<ApplicationHeaderSectionVariants['align'], undefined>;

export type ApplicationHeaderSectionProps = ComponentProps<'div'> & {
  align: ApplicationHeaderSectionAlign;
};

export const ApplicationHeaderSection: FC<ApplicationHeaderSectionProps> = ({
  className,
  children,
  align,
  ...props
}) => {
  return (
    <div {...props} className={clsx(className, styles.section({ align }))}>
      {children}
    </div>
  );
};

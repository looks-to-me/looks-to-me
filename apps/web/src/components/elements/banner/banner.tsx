import { clsx } from 'clsx';

import * as styles from './banner.css';

import type { ComponentPropsWithoutRef, FC } from 'react';

export type ApplicationBannerProps = ComponentPropsWithoutRef<'aside'>;

export const Banner: FC<ApplicationBannerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <aside {...props} className={clsx(className, styles.wrapper)}>
      {children}
    </aside>
  );
};

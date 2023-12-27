import { clsx } from 'clsx';

import * as styles from './application-banner.css';

import type { ComponentPropsWithoutRef, FC } from 'react';

export type ApplicationBannerProps = ComponentPropsWithoutRef<'div'>;

export const ApplicationBanner: FC<ApplicationBannerProps> = ({
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

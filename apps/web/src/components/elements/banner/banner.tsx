import { clsx } from 'clsx';

import * as styles from './banner.css';

import type { ComponentProps, FC } from 'react';

export type ApplicationBannerProps = ComponentProps<'aside'>;

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

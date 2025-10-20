import * as styles from './breadcrumbs.css';

import type { ComponentProps, FC } from 'react';

export type BreadcrumbsProps = ComponentProps<'nav'> & {
  // nothing
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <nav {...props} className={className}>
      <ol className={styles.wrapper}>
        {children}
      </ol>
    </nav>
  );
};

import { forwardRef } from 'react';

import * as styles from './breadcrumbs.css';

import type { ForwardRefRenderFunction , ComponentPropsWithoutRef } from 'react';

export type BreadcrumbsProps = ComponentPropsWithoutRef<'nav'> & {
  // nothing
};

const BreadcrumbsRender: ForwardRefRenderFunction<HTMLElement, BreadcrumbsProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <nav {...props} ref={ref} className={className}>
      <ol className={styles.wrapper}>
        {children}
      </ol>
    </nav>
  );
};

export const Breadcrumbs = forwardRef(BreadcrumbsRender);

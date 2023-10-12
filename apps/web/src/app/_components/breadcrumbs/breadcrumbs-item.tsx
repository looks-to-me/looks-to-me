import clsx from 'clsx';
import Link from 'next/link';

import * as styles from './breadcrumbs.css';
import { Button } from '../button';

import type { Route } from 'next';
import type { ComponentPropsWithoutRef } from 'react';

export type BreadcrumbsItemProps<T extends string> = ComponentPropsWithoutRef<'li'> & {
  href: Route<T>;
};

export const BreadcrumbsItem = <T extends string>({
  className,
  children,
  href,
  ...props
}: BreadcrumbsItemProps<T>) => {
  return (
    <li {...props} className={clsx(className, styles.item)}>
      <Button className={styles.title} variant="ghost" size="tiny" borderless asChild>
        <Link href={href}>
          {children}
        </Link>
      </Button>
    </li>
  );
};

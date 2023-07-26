import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';

import * as styles from './logo.css';

import type { ForwardRefRenderFunction , ComponentPropsWithoutRef } from 'react';

export type LogoProps = Omit<ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  // nothing
};

const LogoRender: ForwardRefRenderFunction<HTMLAnchorElement, LogoProps> = ({
  className,
  ...props
}, ref) => {
  return (
    <Link {...props} ref={ref} className={clsx(className, styles.wrapper)} href="/">
      <h1 className={styles.container}>
        LooksToMe
      </h1>
    </Link>
  );
};

export const Logo = forwardRef(LogoRender);

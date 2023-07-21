import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';

import * as styles from './header.css';

import type { ForwardRefRenderFunction , ComponentPropsWithoutRef } from 'react';

export type HeaderProps = ComponentPropsWithoutRef<'header'> & {
  // nothing
};

const HeaderRender: ForwardRefRenderFunction<HTMLElement, HeaderProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <header {...props} ref={ref} className={clsx(className, styles.wrapper)}>
      <Link className={styles.link} href="/">
        <h1 className={styles.logo}>
          LooksToMe
        </h1>
      </Link>
      <div>
        {children}
      </div>
    </header>
  );
};

export const Header = forwardRef<HTMLElement, HeaderProps>(HeaderRender);

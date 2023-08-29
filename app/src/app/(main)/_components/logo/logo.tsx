import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';

import * as styles from './logo.css';
import { AccessibleIcon } from '../../../_components/accessible-icon';
import { PrefersColorScheme } from '../../../_components/prefers-color-scheme';
import LooksToMeBlack from '../../../_icons/looks-to-me-black.svg';
import LooksToMeWhite from '../../../_icons/looks-to-me-white.svg';

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
        <PrefersColorScheme
          light={(
            <div className={styles.icon}>
              <AccessibleIcon label="LooksToMe">
                <LooksToMeBlack />
              </AccessibleIcon>
            </div>
          )}
          dark={(
            <div className={styles.icon}>
              <AccessibleIcon label="LooksToMe">
                <LooksToMeWhite />
              </AccessibleIcon>
            </div>
          )}
        />
      </h1>
    </Link>
  );
};

export const Logo = forwardRef(LogoRender);

import { clsx } from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';

import * as styles from './application-logo.css';
import { AccessibleIcon } from '../../../../components/elements/accessible-icon';
import { PrefersColorScheme } from '../../../../components/elements/prefers-color-scheme';
import LooksToMeBlack from '../../../../icons/looks-to-me-black.svg';
import LooksToMeWhite from '../../../../icons/looks-to-me-white.svg';
import LooksToMeWithTextBlack from '../../../../icons/looks-to-me-with-text-black.svg';
import LooksToMeWithTextWhite from '../../../../icons/looks-to-me-with-text-white.svg';

import type { ForwardRefRenderFunction , ComponentPropsWithoutRef } from 'react';

export type ApplicationLogoProps = Omit<ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  withText?: boolean;
};

const ApplicationLogoRender: ForwardRefRenderFunction<HTMLAnchorElement, ApplicationLogoProps> = ({
  className,
  withText = false,
  ...props
}, ref) => {
  return (
    <Link {...props} ref={ref} className={clsx(className, styles.wrapper)} href="/">
      <h1 className={styles.container}>
        <PrefersColorScheme
          light={(
            <div className={styles.icon}>
              <AccessibleIcon label="LooksToMe">
                {withText ? (
                  <LooksToMeWithTextBlack width="100%" />
                ) : (
                  <LooksToMeBlack width="100%" />
                )}
              </AccessibleIcon>
            </div>
          )}
          dark={(
            <div className={styles.icon}>
              <AccessibleIcon label="LooksToMe">
                {withText ? (
                  <LooksToMeWithTextWhite width="100%" />
                ) : (
                  <LooksToMeWhite width="100%" />
                )}
              </AccessibleIcon>
            </div>
          )}
        />
      </h1>
    </Link>
  );
};

export const ApplicationLogo = forwardRef(ApplicationLogoRender);

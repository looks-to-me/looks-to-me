import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';

import * as styles from './application-logo.css';
import { AccessibleIcon } from '../../../_components/accessible-icon';
import { PrefersColorScheme } from '../../../_components/prefers-color-scheme';
import LooksToMeBlack from '../../../_icons/looks-to-me-black.svg';
import LooksToMeWhite from '../../../_icons/looks-to-me-white.svg';
import LooksToMeWithTextBlack from '../../../_icons/looks-to-me-with-text-black.svg';
import LooksToMeWithTextWhite from '../../../_icons/looks-to-me-with-text-white.svg';

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
                  <LooksToMeWithTextBlack width="100%" height="auto" />
                ) : (
                  <LooksToMeBlack width="100%" height="auto" />
                )}
              </AccessibleIcon>
            </div>
          )}
          dark={(
            <div className={styles.icon}>
              <AccessibleIcon label="LooksToMe">
                {withText ? (
                  <LooksToMeWithTextWhite width="100%" height="auto" />
                ) : (
                  <LooksToMeWhite width="100%" height="auto" />
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

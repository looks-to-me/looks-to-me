import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';

import * as styles from './application-logo-with-text.css';
import { AccessibleIcon } from '../../../_components/accessible-icon';
import { PrefersColorScheme } from '../../../_components/prefers-color-scheme';
import LooksToMeWithTextBlack from '../../../_icons/looks-to-me-with-text-black.svg';
import LooksToMeWithTextWhite from '../../../_icons/looks-to-me-with-text-white.svg';

import type { ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type ApplicationLogoWithTextProps = Omit<ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  // nothing
};

export const ApplicationLogoWithTextRender: ForwardRefRenderFunction<
  HTMLAnchorElement,
ApplicationLogoWithTextProps> = ({ className, ...props }, ref) => {
  return (
    <Link {...props} ref={ref} className={clsx(className, styles.wrapper)} href="/">
      <h1 className={clsx(styles.container)}>
        <PrefersColorScheme
          light={(
            <div>
              <AccessibleIcon
                label="LooksToMe"
              >
                <LooksToMeWithTextBlack width="auto" height="auto" />
              </AccessibleIcon>
            </div>
          )}
          dark={(
            <div>
              <AccessibleIcon label="LooksToMe">
                <LooksToMeWithTextWhite width="auto" height="auto" />
              </AccessibleIcon>
            </div>
          )}
        /> 
      </h1>
    </Link>
  );
};

export const ApplicationLogoWithText = forwardRef(ApplicationLogoWithTextRender);

import { getYear } from 'date-fns';

import * as styles from './global-navigation.css';
import { AccessibleIcon } from '../../../_components/accessible-icon';
import { Button } from '../../../_components/button';
import { PrefersColorScheme } from '../../../_components/prefers-color-scheme';
import { Sheet, SheetContent, SheetSection, SheetTitle, SheetTrigger } from '../../../_components/sheet';
import { VisuallyHidden } from '../../../_components/visually-hidden';
import GitHubBlack from '../../../_icons/github-black.svg';
import GitHubWhite from '../../../_icons/github-white.svg';
import MenuIcon from '../../../_icons/menu.svg';
import ReportIcon from '../../../_icons/report.svg';
import StorybookBlack from '../../../_icons/storybook-black.svg';
import StorybookWhite from '../../../_icons/storybook-white.svg';
import { Logo } from '../logo';

import type { FC } from 'react';

export type GlobalNavigationProps = {
  className?: string | undefined;
};

export const GlobalNavigation: FC<GlobalNavigationProps> = ({
  className,
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className={className} size="icon">
          <AccessibleIcon label="Open global navigation">
            <MenuIcon />
          </AccessibleIcon>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetSection className={styles.main}>
          <VisuallyHidden>
            <SheetTitle>
              Global navigation
            </SheetTitle>
          </VisuallyHidden>
          <Logo />
        </SheetSection>
        <SheetSection>
          <Button variant="ghost" size="medium" borderless asChild>
            <a href="https://github.com/looks-to-me/looks-to-me" target="_blank">
              <PrefersColorScheme
                light={<GitHubBlack />}
                dark={<GitHubWhite />}
              />
              GitHub Repository
            </a>
          </Button>
          <Button variant="ghost" size="medium" borderless asChild>
            <a href="/storybook/" target="_blank">
              <PrefersColorScheme
                light={<StorybookBlack />}
                dark={<StorybookWhite />}
              />
              Storybook
            </a>
          </Button>
          <Button variant="ghost" size="medium" borderless asChild>
            <a href="https://github.com/looks-to-me/looks-to-me/issues" target="_blank">
              <ReportIcon className={styles.buttonLinkIcon} />
              Bug reports or feature requests
            </a>
          </Button>
          <div className={styles.footer}>
            <small className={styles.copyright}>
              © {getYear(new Date())} PrAha, Inc.
            </small>
            <div className={styles.companyLinks}>
              <a href="https://www.praha-inc.com/" target="_blank">PrAha</a>
              <a href="https://tech.agaroot.co.jp/" target="_blank">AGAROOT TECHNOLOGIES</a>
            </div>
          </div>
        </SheetSection>
      </SheetContent>
    </Sheet>
  );
};

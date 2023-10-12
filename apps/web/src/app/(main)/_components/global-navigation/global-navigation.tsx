import { getYear } from 'date-fns';
import Link from 'next/link';

import * as styles from './global-navigation.css';
import { AccessibleIcon } from '../../../_components/accessible-icon';
import { Button, ButtonIcon } from '../../../_components/button';
import { PrefersColorScheme } from '../../../_components/prefers-color-scheme';
import { Sheet, SheetContent, SheetSection, SheetTitle, SheetTrigger } from '../../../_components/sheet';
import { VisuallyHidden } from '../../../_components/visually-hidden';
import GitHubBlack from '../../../_icons/github-black.svg';
import GitHubWhite from '../../../_icons/github-white.svg';
import HomeIcon from '../../../_icons/home.svg';
import MenuIcon from '../../../_icons/menu.svg';
import ReportIcon from '../../../_icons/report.svg';
import ShuffleIcon from '../../../_icons/shuffle.svg';
import StorybookBlack from '../../../_icons/storybook-black.svg';
import StorybookWhite from '../../../_icons/storybook-white.svg';
import { ApplicationLogo } from '../application-logo';

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
          <ButtonIcon>
            <AccessibleIcon label="Open global navigation">
              <MenuIcon />
            </AccessibleIcon>
          </ButtonIcon>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetSection className={styles.main}>
          <VisuallyHidden>
            <SheetTitle>
              Global navigation
            </SheetTitle>
          </VisuallyHidden>
          <ApplicationLogo className={styles.logo} />
          <Button variant="ghost" size="medium" borderless asChild>
            <Link href="/">
              <ButtonIcon>
                <HomeIcon className={styles.buttonLinkIcon} />
              </ButtonIcon>
              Home
            </Link>
          </Button>
          <Button variant="ghost" size="medium" borderless asChild>
            <Link href="/shuffle">
              <ButtonIcon>
                <ShuffleIcon className={styles.buttonLinkIcon} />
              </ButtonIcon>
              Shuffle
            </Link>
          </Button>
        </SheetSection>
        <SheetSection>
          <Button variant="ghost" size="medium" borderless asChild>
            <a href="https://github.com/looks-to-me/looks-to-me" target="_blank">
              <PrefersColorScheme
                className={styles.buttonLinkIcon}
                light={<GitHubBlack />}
                dark={<GitHubWhite />}
              />
              GitHub Repository
            </a>
          </Button>
          <Button variant="ghost" size="medium" borderless asChild>
            <a href="/storybook/" target="_blank">
              <PrefersColorScheme
                className={styles.buttonLinkIcon}
                light={<StorybookBlack />}
                dark={<StorybookWhite />}
              />
              Storybook
            </a>
          </Button>
          <Button variant="ghost" size="medium" borderless asChild>
            <a href="https://github.com/looks-to-me/looks-to-me/issues" target="_blank">
              <ButtonIcon>
                <ReportIcon className={styles.buttonLinkIcon} />
              </ButtonIcon>
              Bug reports or feature requests
            </a>
          </Button>
          <div className={styles.footer}>
            <small className={styles.copyright}>
              © {getYear(new Date())} PrAha, Inc.
            </small>
            <div className={styles.links}>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms Of Use</a>
            </div>
            <div className={styles.links}>
              <a href="https://www.praha-inc.com/" target="_blank">PrAha</a>
              <a href="https://tech.agaroot.co.jp/" target="_blank">AGAROOT TECHNOLOGIES</a>
            </div>
          </div>
        </SheetSection>
      </SheetContent>
    </Sheet>
  );
};
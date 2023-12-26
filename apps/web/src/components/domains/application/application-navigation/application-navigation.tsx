import { getYear } from 'date-fns';
import { CircleDotIcon, HomeIcon, MenuIcon, ShuffleIcon } from 'lucide-react';
import Link from 'next/link';

import * as styles from './application-navigation.css';
import GitHubBlack from '../../../../icons/github-black.svg';
import GitHubWhite from '../../../../icons/github-white.svg';
import StorybookBlack from '../../../../icons/storybook-black.svg';
import StorybookWhite from '../../../../icons/storybook-white.svg';
import { AccessibleIcon } from '../../../elements/accessible-icon';
import { Button, ButtonIcon } from '../../../elements/button';
import { PrefersColorScheme } from '../../../elements/prefers-color-scheme';
import { Sheet, SheetContent, SheetSection, SheetTitle, SheetTrigger } from '../../../elements/sheet';
import { VisuallyHidden } from '../../../elements/visually-hidden';
import { ApplicationLogo } from '../application-logo';

import type { FC } from 'react';

export type ApplicationNavigationProps = {
  className?: string | undefined;
};

export const ApplicationNavigation: FC<ApplicationNavigationProps> = ({
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
                <HomeIcon />
              </ButtonIcon>
              Home
            </Link>
          </Button>
          <Button variant="ghost" size="medium" borderless asChild>
            <Link href="/shuffle">
              <ButtonIcon>
                <ShuffleIcon />
              </ButtonIcon>
              Shuffle
            </Link>
          </Button>
        </SheetSection>
        <SheetSection>
          <Button variant="ghost" size="medium" borderless asChild>
            <a href="https://github.com/looks-to-me/looks-to-me" target="_blank">
              <ButtonIcon>
                <PrefersColorScheme
                  light={<GitHubBlack />}
                  dark={<GitHubWhite />}
                />
              </ButtonIcon>
              GitHub Repository
            </a>
          </Button>
          <Button variant="ghost" size="medium" borderless asChild>
            <a href="/storybook/" target="_blank">
              <ButtonIcon>
                <PrefersColorScheme
                  light={<StorybookBlack />}
                  dark={<StorybookWhite />}
                />
              </ButtonIcon>
              Storybook
            </a>
          </Button>
          <Button variant="ghost" size="medium" borderless asChild>
            <a href="https://github.com/looks-to-me/looks-to-me/issues" target="_blank">
              <ButtonIcon>
                <CircleDotIcon />
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

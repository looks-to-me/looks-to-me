import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';

import * as styles from './header.css';
import GitHubBlack from '../../_icons/github-black.svg';
import GitHubWhite from '../../_icons/github-white.svg';
import StorybookBlack from '../../_icons/storybook-black.svg';
import StorybookWhite from '../../_icons/storybook-white.svg';
import { Button } from '../button';
import { PrefersColorScheme } from '../prefers-color-scheme';

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
      <div className={styles.container}>
        {children}
      </div>
      <div className={styles.links}>
        <Button variant="ghost" size="icon" asChild>
          <a className={styles.link} href="https://github.com/looks-to-me/looks-to-me">
            <PrefersColorScheme
              light={<GitHubBlack />}
              dark={<GitHubWhite />}
            />
          </a>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a className={styles.link} href="/storybook/">
            <PrefersColorScheme
              light={<StorybookBlack />}
              dark={<StorybookWhite />}
            />
          </a>
        </Button>
      </div>
    </header>
  );
};

export const Header = forwardRef(HeaderRender);

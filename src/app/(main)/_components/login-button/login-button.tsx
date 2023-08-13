import * as styles from './login-button.css';
import { Button } from '../../../_components/button';
import { PrefersColorScheme } from '../../../_components/prefers-color-scheme';
import GitHubBlack from '../../../_icons/github-black.svg';
import GitHubWhite from '../../../_icons/github-white.svg';

import type { FC, ComponentPropsWithoutRef } from 'react';

type OmitProps = 'variant' | 'borderless' | 'asChild';

export type LoginButtonProps = Omit<ComponentPropsWithoutRef<typeof Button>, OmitProps> & {
  // nothing
};

export const LoginButton: FC<LoginButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <form action="/auth/login" method='post'>
      <Button {...props} className={className} variant="primary" >
        <PrefersColorScheme
          className={styles.icon}
          light={<GitHubBlack />}
          dark={<GitHubWhite />}
        />
        Login with GitHub
      </Button>
    </form>
  );
};

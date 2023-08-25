import Link from 'next/link';

import * as styles from './login-button.css';
import { Button } from '../../../_components/button';
import { Dialog } from '../../../_components/dialog';
import { DialogContent } from '../../../_components/dialog/dialog-content';
import { DialogTrigger } from '../../../_components/dialog/dialog-trigger';
import { GitHubLoginButton } from '../github-login-button';

import type { FC } from 'react';

export const LoginButton: FC = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="medium">Login</Button>
      </DialogTrigger>
      <DialogContent>
        <div className={styles.content}>
          {/* TODO: Add a description of the favorite feature when it is created */}
          <p>By logging in, you will be able to submit images.</p>
          <div className={styles.buttonArea}>
            <GitHubLoginButton />
          </div>
          {/* TODO: "terms of use" link */}
          <p className={styles.annotation}>
            Please login after agreeing to the terms of use and <Link href="/privacy">privacy policy</Link>.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

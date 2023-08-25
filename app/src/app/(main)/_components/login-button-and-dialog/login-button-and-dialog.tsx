import * as styles from './login-button-and-dialog.css';
import { Button } from '../../../_components/button';
import { Dialog } from '../../../_components/dialog';
import { DialogContent } from '../../../_components/dialog/dialog-content';
import { DialogTrigger } from '../../../_components/dialog/dialog-trigger';
import { GitHubLoginButton } from '../github-login-button';

import type { FC } from 'react';

export const LoginButtonAndDialog: FC = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <div className={styles.content}>
          {/* TODO: いいねできるようになったら、それも書く */}
          <p>Login to be able to post images.</p>
          <div className={styles.buttonArea}>
            <GitHubLoginButton />
          </div>
          {/* TODO: "terms of use and privacy policy"をリンクにする */}
          <p className={styles.annotation}>Please login after agreeing to the terms of use and privacy policy.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

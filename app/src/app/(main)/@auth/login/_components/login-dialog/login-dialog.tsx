import clsx from 'clsx';
import Link from 'next/link';

import * as styles from './login-dialog.css';
import { GitHubLoginButton } from '../../../../_components/github-login-button';

import type { FC } from 'react';

export type LoginDialogProps = {
  className?: string | undefined;
};

export const LoginDialog: FC<LoginDialogProps> = ({
  className,
}) => {
  return (
    <div className={clsx(className, styles.wrapper)}>
      {/* TODO: Add a description of the favorite feature when it is created */}
      <p className={styles.paragraph}>LooksToMeはLGTM画像共有プラットフォームです。</p>
      <p className={styles.paragraph}>ログインする事で画像投稿が可能になります。</p>
      <div className={styles.buttonArea}>
        <GitHubLoginButton />
      </div>
      {/* TODO: "terms of use" link */}
      <p className={styles.annotation}>
        利用規約、<Link href="/privacy">プライバシーポリシー</Link>に同意したうえでログインしてください。
      </p>
    </div>
  );
};

import clsx from 'clsx';
import Link from 'next/link';

import * as styles from './login-form.css';
import { ApplicationLogoWithText } from '../application-logo-with-text';
import { GitHubLoginButton } from '../github-login-button';

import type { FC } from 'react';

export type LoginFormProps = {
  className?: string | undefined;
};

export const LoginForm: FC<LoginFormProps> = ({
  className,
}) => {
  return (
    <div className={clsx(className, styles.wrapper)}>
      <div className={styles.brand}>
        <ApplicationLogoWithText />
      </div>
      <p className={styles.paragraph}>LooksToMeはLGTM画像共有プラットフォームです。良い感じな画像をみんなでシェアしましょう。</p>
      <div className={styles.buttonArea}>
        <GitHubLoginButton size="medium" />
      </div>
      <p className={styles.annotation}>
        <Link href="/terms">利用規約</Link>、<Link href="/privacy">プライバシーポリシー</Link>に同意したうえでログインしてください。
      </p>
    </div>
  );
};

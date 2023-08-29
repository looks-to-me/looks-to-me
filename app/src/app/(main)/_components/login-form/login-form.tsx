import clsx from 'clsx';
import Link from 'next/link';

import * as styles from './login-form.css';
import { ApplicationLogo } from '../application-logo';
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
        <ApplicationLogo />
        LooksToMe
      </div>
      <p className={styles.paragraph}>LooksToMeはLGTM画像共有プラットフォームです。良い感じな画像をみんなでシェアしましょう。</p>
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

'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import * as styles from './login-dialog.css';
import { Dialog } from '../../../../../_components/dialog';
import { DialogContent } from '../../../../../_components/dialog/dialog-content';
import { useIsMounted } from '../../../../../_hooks/useIsMounted';
import { GitHubLoginButton } from '../../../../_components/github-login-button';

import type { FC } from 'react';

export type LoginDialogProps = {
  className?: string | undefined;
  canGoBack: boolean;
};

export const LoginDialog: FC<LoginDialogProps> = ({
  className,
  canGoBack,
}) => {
  const isMounted = useIsMounted();
  const router = useRouter();

  const handleOpenChange = useCallback((open: boolean) => {
    if (open) return;

    if (canGoBack) {
      return router.back();
    } else {
      return router.push('/');
    }
  }, [canGoBack, router]);

  return (
    <Dialog open={isMounted} onOpenChange={handleOpenChange}>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
};

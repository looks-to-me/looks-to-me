'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import * as styles from './login-dialog.css';
import { Dialog } from '../../../../../_components/dialog';
import { DialogContent } from '../../../../../_components/dialog/dialog-content';
import { useIsMounted } from '../../../../../_hooks/use-is-mounted';
import { LoginForm } from '../../../../_components/login-form';

import type { FC } from 'react';

export type LoginDialogProps = {
  className?: string | undefined;
};

export const LoginDialog: FC<LoginDialogProps> = ({
  className,
}) => {
  const isMounted = useIsMounted();
  const router = useRouter();

  const handleOpenChange = useCallback((open: boolean) => {
    if (open) return;

    router.back();
  }, [router]);

  return (
    <Dialog open={isMounted} onOpenChange={handleOpenChange}>
      <DialogContent className={className}>
        <LoginForm className={styles.form} />
      </DialogContent>
    </Dialog>
  );
};

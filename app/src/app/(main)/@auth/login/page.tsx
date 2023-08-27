'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { LoginDialog } from './_components/login-dialog';
import { Dialog } from '../../../_components/dialog';
import { DialogContent } from '../../../_components/dialog/dialog-content';
import { useIsMounted } from '../../../_hooks/useIsMounted';

import type { FC } from 'react';

export const runtime = 'edge';

const AuthLoginPage: FC = () => {
  const isMounted = useIsMounted();
  const router = useRouter();

  const handleOpenChange = useCallback((open: boolean) => {
    if (open) return;
    router.back();
  }, [router]);

  return (
    <Dialog open={isMounted} onOpenChange={handleOpenChange}>
      <DialogContent>
        <LoginDialog />
      </DialogContent>
    </Dialog>
  );
};

export default AuthLoginPage;

'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Dialog } from '../../../../_components/dialog';
import { DialogContent } from '../../../../_components/dialog/dialog-content';
import { useIsMounted } from '../../../../_hooks/use-is-mounted';

import type { DialogProps } from '../../../../_components/dialog';
import type { FC } from 'react';

export type ModalDialogProps = Omit<DialogProps, 'open' | 'onOpenChange'>;

export const ModalDialog: FC<ModalDialogProps> = ({
  children,
  ...props
}) => {
  const isMounted = useIsMounted();
  const router = useRouter();

  const handleOpenChange = useCallback((open: boolean) => {
    if (open) return;

    router.back();
  }, [router]);

  return (
    <Dialog {...props} open={isMounted} onOpenChange={handleOpenChange}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

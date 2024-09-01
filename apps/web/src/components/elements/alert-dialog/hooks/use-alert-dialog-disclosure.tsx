import { useKeyPress } from 'ahooks';
import { useCallback, useState } from 'react';

import type { OpenAlertDialogProps } from '../contexts/alert-dialog-context';

type AlertDialogState = {
  isOpen: false;
} | (OpenAlertDialogProps & {
  isOpen: true;
  accept: () => void;
  reject: () => void;
});

export const useAlertDialogDisclosure = () => {
  const [alertDialogState, setAlertDialogState] = useState<AlertDialogState>({
    isOpen: false,
  });

  useKeyPress('ESC', () => {
    if (!alertDialogState.isOpen) return;
    alertDialogState.reject();
  });

  const closeAlertDialog = useCallback(() => setAlertDialogState({ isOpen: false }), []);

  const openAlertDialog = useCallback(async (props: OpenAlertDialogProps) => {
    return await new Promise<boolean>((resolve) => {
      setAlertDialogState({
        isOpen: true,
        ...props,
        accept: () => resolve(true),
        reject: () => resolve(false),
      });
    }).finally(() => closeAlertDialog());
  }, [closeAlertDialog]);

  return {
    alertDialogState,
    openAlertDialog,
  };
};

import { useKeyPress } from 'ahooks';
import { useCallback, useState } from 'react';

import type { OpenAlertDialogProps } from '../alert-dialog-provider';

type AlertDialogState = ({
  isOpen: true;
  accept: () => void;
  reject: () => void;
} & OpenAlertDialogProps ) | {
  isOpen: false;
};

export const useAlertDialogDisclosure = () => {
  const [modalState, setModalState] = useState<AlertDialogState>({
    isOpen: false,
  });

  useKeyPress('ESC', () => {
    if (!modalState.isOpen) return;
    modalState.reject();
  });

  const closeAlertDialog = useCallback(() => setModalState({ isOpen: false }), []);

  const openAlertDialog = useCallback(async (props: OpenAlertDialogProps ) => {
    return await new Promise<boolean>((resolve) => {
      setModalState({
        isOpen: true,
        ...props,
        accept: () => resolve(true),
        reject: () => resolve(false),
      });
    }).finally(() => closeAlertDialog());
  }, []);

  return {
    modalState,
    openAlertDialog,
  };
};

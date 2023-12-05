import { useKeyPress } from 'ahooks';
import { useCallback, useState } from 'react';

import type { OpenModalProps } from '../alert-dialog-provider';

type ModalState = ({
  isOpen: true;
  accept: () => void;
  reject: () => void;
} & OpenModalProps) | {
  isOpen: false;
};

export const useAlertDialogDisclosure = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
  });

  const handleOnPressESC = useCallback(() => {
    if (!modalState.isOpen) return;
    modalState.reject();
  }, [modalState]);
  useKeyPress('ESC', handleOnPressESC);

  const closeModal = useCallback(() => setModalState({ isOpen: false }), []);

  const openModal = useCallback(async (props: OpenModalProps) => {
    const {
      description,
      title,
      acceptButton,
      rejectButton,
    } = props;
    return await new Promise<boolean>((resolve) => {
      setModalState({
        isOpen: true,
        title,
        description,
        acceptButton,
        rejectButton,
        accept: () => resolve(true),
        reject: () => resolve(false),
      });
    }).finally(() => closeModal(),
    );
  }, []);

  return {
    modalState,
    openModal,
  };
};

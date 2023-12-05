import { useKeyPress } from 'ahooks';
import { useCallback, useState } from 'react';

import type { ShowModalProps } from '..';

type ModalState = ({
  isOpen: true;
  approve: () => void;
  reject: () => void;
} & Required<ShowModalProps>) | {
  isOpen: false;
};

export const useGlobalConfirmModalDisclosure = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
  });

  const handleOnPressESC = useCallback(() => {
    if (!modalState.isOpen) return;
    modalState.reject();
  }, [modalState]);
  useKeyPress('ESC', handleOnPressESC);

  const closeModal = useCallback(() => setModalState({ isOpen: false }), []);
  
  const openModal = useCallback(async (props: ShowModalProps) => {
    const { description, title, approveButtonLabel = 'Yes', rejectButtonLabel = 'Cancel' } = props;
    return await new Promise<boolean>((resolve) => {
      setModalState({
        isOpen: true,
        title,
        description,
        approveButtonLabel,
        rejectButtonLabel,
        approve: () => resolve(true),
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

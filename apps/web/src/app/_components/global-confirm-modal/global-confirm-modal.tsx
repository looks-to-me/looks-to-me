'use client';
import { createContext, useCallback, useContext, useState } from 'react';

import * as styles from './global-confirm-modal.css';
import { Button } from '../button';
import { Dialog } from '../dialog';
import { DialogContent } from '../dialog/dialog-content';
import { DialogDescription } from '../dialog/dialog-description';
import { DialogTitle } from '../dialog/dialog-title';

import type { ReactNode, FC } from 'react';

type ModalState = {
  isOpen: true;
  title: ReactNode;
  description: ReactNode;
  approve: () => void;
  reject: () => void;
} | {
  isOpen: false;
};

export type ShowModalProps = {
  title: ReactNode;
  description: ReactNode;
};

type ContextType = {
  openModal: (props: ShowModalProps) => Promise<boolean>;
  closeModal: () => void;
};
const Context = createContext<ContextType>(null as unknown as ContextType);

export const GlobalConfirmModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
  });

  const closeModal = useCallback(() => setModalState({ isOpen: false }), []);
  const openModal = useCallback(async ({ description, title }: ShowModalProps) => {
    return await new Promise<boolean>((resolve) => {
      setModalState({
        isOpen: true,
        title,
        description,
        approve: () => resolve(true),
        reject: () => resolve(false),
      });
    }).finally(() => closeModal(),
    );
  }, []);

  const handleOnClickApprove = useCallback(() => {
    if (!modalState.isOpen) return;
    modalState.approve();
  }, [modalState]);

  const handleOnClickReject = useCallback(() => {
    if (!modalState.isOpen) return;
    modalState.reject();
  }, [modalState]);

  return (
    <Context.Provider value={{ openModal, closeModal }}>
      {children}
      {modalState.isOpen && (
        <Dialog open={modalState.isOpen}>
          <DialogContent onClickOverlay={handleOnClickReject} className={styles.main}>
            <DialogTitle>{modalState.title}</DialogTitle>
            <DialogDescription>{modalState.description}</DialogDescription>
            <div className={styles.buttonWrapper}>
              <Button onClick={handleOnClickApprove} variant="danger">OK</Button>
              <Button className={styles.cancelButton} onClick={handleOnClickReject}>Cancel</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

    </Context.Provider>
  );
};

export const useGlobalConfirmModal = () => {
  return useContext(Context);
};

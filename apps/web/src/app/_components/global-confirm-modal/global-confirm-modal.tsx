'use client';
import { createContext, useCallback, useContext } from 'react';

import * as styles from './global-confirm-modal.css';
import { useGlobalConfirmModalDisclosure } from './hooks/use-global-confirm-modal-disclosure';
import { AlertDialog } from '../alert-dialog';
import { AlertDialogAction } from '../alert-dialog/alert-dialog-action';
import { AlertDialogCancel } from '../alert-dialog/alert-dialog-cancel';
import { AlertDialogContent } from '../alert-dialog/alert-dialog-content';
import { AlertDialogDescription } from '../alert-dialog/alert-dialog-description';
import { AlertDialogTitle } from '../alert-dialog/alert-dialog-title';
import { Button } from '../button';

import type { ReactNode, FC } from 'react';

export type ShowModalProps = {
  title: ReactNode;
  description: ReactNode;
  acceptButton?: ReactNode;
  rejectButton?: ReactNode;
};

type ContextType = {
  openModal: (props: ShowModalProps) => Promise<boolean>;
};
const Context = createContext<ContextType>(null as unknown as ContextType);

export const GlobalConfirmModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { modalState, openModal } = useGlobalConfirmModalDisclosure();

  const handleOnClickApprove = useCallback(() => {
    if (!modalState.isOpen) return;
    modalState.accept();
  }, [modalState]);

  const handleOnClickReject = useCallback(() => {
    if (!modalState.isOpen) return;
    modalState.reject();
  }, [modalState]);

  return (
    <Context.Provider value={{ openModal }}>
      {children}
      {modalState.isOpen &&
        (() => {
          const { acceptButton, rejectButton, description, isOpen, title } = modalState;
          return (
            <AlertDialog open={isOpen}>
              <AlertDialogContent>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
                <div className={styles.buttonWrapper}>
                  <AlertDialogAction onClick={handleOnClickApprove}>
                    {acceptButton ?? <Button variant="danger">OK</Button>}
                  </AlertDialogAction>
                  <AlertDialogCancel onClick={handleOnClickReject}>
                    {rejectButton ?? <Button>Cancel</Button>}
                  </AlertDialogCancel>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          );
        })()}
    </Context.Provider>
  );
};

export const useGlobalConfirmModal = () => {
  return useContext(Context);
};

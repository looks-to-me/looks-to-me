'use client';
import { createContext, useCallback, useContext } from 'react';

import { AlertDialog } from '.';
import { AlertDialogAction } from './alert-dialog-action';
import { AlertDialogCancel } from './alert-dialog-cancel';
import { AlertDialogContent } from './alert-dialog-content';
import { AlertDialogDescription } from './alert-dialog-description';
import { AlertDialogTitle } from './alert-dialog-title';
import * as styles from './alert-dialog.css';
import { useAlertDialogDisclosure } from './hooks/use-alert-dialog-disclosure';
import { Button } from '../button';

import type { ReactNode, FC } from 'react';

export type OpenAlertDialogProps = {
  title: ReactNode;
  description: ReactNode;
  acceptButton?: ReactNode;
  rejectButton?: ReactNode;
};

type ContextType = {
  openAlertDialog: (props: OpenAlertDialogProps ) => Promise<boolean>;
};
const Context = createContext<ContextType>(null as unknown as ContextType);

export type AlertDialogProviderProps = { children: ReactNode };
export const AlertDialogProvider: FC<AlertDialogProviderProps> = ({
  children,
}) => {
  const { modalState, openAlertDialog } = useAlertDialogDisclosure();

  const handleOnClickApprove = useCallback(() => {
    if (!modalState.isOpen) return;
    modalState.accept();
  }, [modalState]);

  const handleOnClickReject = useCallback(() => {
    if (!modalState.isOpen) return;
    modalState.reject();
  }, [modalState]);

  return (
    <Context.Provider value={{ openAlertDialog }}>
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

export const useAlertDialog = () => {
  return useContext(Context);
};

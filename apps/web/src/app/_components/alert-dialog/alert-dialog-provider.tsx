'use client';
import React, { cloneElement, createContext, useCallback, useContext } from 'react';

import { AlertDialog } from '.';
import { AlertDialogAction } from './alert-dialog-action';
import { AlertDialogCancel } from './alert-dialog-cancel';
import { AlertDialogContent } from './alert-dialog-content';
import { AlertDialogDescription } from './alert-dialog-description';
import { AlertDialogTitle } from './alert-dialog-title';
import * as styles from './alert-dialog.css';
import { useAlertDialogDisclosure } from './hooks/use-alert-dialog-disclosure';

import type { ButtonProps } from '../button';
import type { ReactNode, FC, ReactElement } from 'react';

export type OpenAlertDialogProps = {
  title: ReactNode;
  description: ReactNode;
  acceptButton: ReactElement<ButtonProps>;
  rejectButton: ReactElement<ButtonProps>;
};
type ContextType = {
  openAlertDialog: (props: OpenAlertDialogProps ) => Promise<boolean>;
};
const Context = createContext<ContextType>({
  openAlertDialog: () => {
    throw new Error('DialogContext not implemented');
  },
});

export type AlertDialogProviderProps = { children: ReactNode };
export const AlertDialogProvider: FC<AlertDialogProviderProps> = ({
  children,
}) => {
  const { modalState, openAlertDialog } = useAlertDialogDisclosure();

  const handleOnClickAccept = useCallback(() => {
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
                  <AlertDialogAction>
                    {cloneElement(acceptButton, { onClick: handleOnClickAccept })}
                  </AlertDialogAction>
                  <AlertDialogCancel>
                    {cloneElement(rejectButton, { onClick: handleOnClickReject })}
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

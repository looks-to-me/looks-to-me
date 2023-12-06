'use client';
import React, { cloneElement, useCallback } from 'react';

import { AlertDialog } from '.';
import { AlertDialogAction } from './alert-dialog-action';
import { AlertDialogCancel } from './alert-dialog-cancel';
import { AlertDialogContent } from './alert-dialog-content';
import { AlertDialogDescription } from './alert-dialog-description';
import { AlertDialogFooter } from './alert-dialog-footer';
import { AlertDialogTitle } from './alert-dialog-title';
import { AlertDialogContext } from './contexts/alert-dialog-context';
import { useAlertDialogDisclosure } from './hooks/use-alert-dialog-disclosure';

import type { ButtonProps } from '../button';
import type { ReactNode, FC, ReactElement } from 'react';

export type OpenAlertDialogProps = {
  title: ReactNode;
  description: ReactNode;
  acceptButton: ReactElement<ButtonProps>;
  rejectButton: ReactElement<ButtonProps>;
};

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
    <AlertDialogContext.Provider value={{ openAlertDialog }}>
      {children}
      {modalState.isOpen && (
        <AlertDialog open={modalState.isOpen}>
          <AlertDialogContent>
            <AlertDialogTitle>{modalState.title}</AlertDialogTitle>
            <AlertDialogDescription>{modalState.description}</AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>
                {cloneElement(modalState.rejectButton, { onClick: handleOnClickReject })}
              </AlertDialogCancel>
              <AlertDialogAction>
                {cloneElement(modalState.acceptButton, { onClick: handleOnClickAccept })}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AlertDialogContext.Provider>
  );
};

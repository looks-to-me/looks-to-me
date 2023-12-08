'use client';
import React, { cloneElement, useCallback } from 'react';

import { AlertDialog } from './alert-dialog';
import { AlertDialogAction } from './alert-dialog-action';
import { AlertDialogCancel } from './alert-dialog-cancel';
import { AlertDialogContent } from './alert-dialog-content';
import { AlertDialogDescription } from './alert-dialog-description';
import { AlertDialogFooter } from './alert-dialog-footer';
import { AlertDialogTitle } from './alert-dialog-title';
import { AlertDialogContext } from './contexts/alert-dialog-context';
import { useAlertDialogDisclosure } from './hooks/use-alert-dialog-disclosure';

import type { ReactNode, FC } from 'react';

export type AlertDialogProviderProps = { children: ReactNode };
export const AlertDialogProvider: FC<AlertDialogProviderProps> = ({
  children,
}) => {
  const { alertDialogState, openAlertDialog } = useAlertDialogDisclosure();

  const handleOnClickAccept = useCallback(() => {
    if (!alertDialogState.isOpen) return;
    alertDialogState.accept();
  }, [alertDialogState]);

  const handleOnClickReject = useCallback(() => {
    if (!alertDialogState.isOpen) return;
    alertDialogState.reject();
  }, [alertDialogState]);

  return (
    <AlertDialogContext.Provider value={{ openAlertDialog }}>
      {children}
      {alertDialogState.isOpen && (
        <AlertDialog open={alertDialogState.isOpen}>
          <AlertDialogContent>
            <AlertDialogTitle>{alertDialogState.title}</AlertDialogTitle>
            <AlertDialogDescription>{alertDialogState.description}</AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>
                {cloneElement(alertDialogState.rejectButton, { onClick: handleOnClickReject })}
              </AlertDialogCancel>
              <AlertDialogAction>
                {cloneElement(alertDialogState.acceptButton, { onClick: handleOnClickAccept })}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AlertDialogContext.Provider>
  );
};

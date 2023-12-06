'use client';

import { createContext } from 'react';

import type { ButtonProps } from '../../button';
import type { ReactElement, ReactNode } from 'react';

export type OpenAlertDialogProps = {
  title: ReactNode;
  description: ReactNode;
  acceptButton: ReactElement<ButtonProps>;
  rejectButton: ReactElement<ButtonProps>;
};

type ContextType = {
  openAlertDialog: (props: OpenAlertDialogProps ) => Promise<boolean>;
};

export const AlertDialogContext = createContext<ContextType>({
  openAlertDialog: () => {
    throw new Error('DialogContext not implemented');
  },
});

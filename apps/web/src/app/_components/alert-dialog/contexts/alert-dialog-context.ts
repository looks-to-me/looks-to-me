'use client';

import { createContext } from 'react';

import type { ReactElement, ReactNode } from 'react';

export type OpenAlertDialogProps = {
  title: ReactNode;
  description: ReactNode;
  acceptButton: ReactElement<{ onClick: () => void }>;
  rejectButton: ReactElement<{ onClick: () => void }>;
};

type ContextType = {
  openAlertDialog: (props: OpenAlertDialogProps ) => Promise<boolean>;
};

export const AlertDialogContext = createContext<ContextType>({
  openAlertDialog: () => {
    throw new Error('DialogContext not implemented');
  },
});

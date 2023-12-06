'use client';

import { createContext } from 'react';

import type { OpenAlertDialogProps } from '../alert-dialog-provider';

type ContextType = {
  openAlertDialog: (props: OpenAlertDialogProps ) => Promise<boolean>;
};

export const AlertDialogContext = createContext<ContextType>({
  openAlertDialog: () => {
    throw new Error('DialogContext not implemented');
  },
});

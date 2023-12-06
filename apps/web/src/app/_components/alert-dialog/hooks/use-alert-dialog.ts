import { useContext } from 'react';

import { AlertDialogContext } from '../alert-dialog-provider';

export const useAlertDialog = () => {
  return useContext(AlertDialogContext);
};

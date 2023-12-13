import { useContext } from 'react';

import { AlertDialogContext } from '../contexts/alert-dialog-context';

export const useAlertDialog = () => {
  return useContext(AlertDialogContext);
};

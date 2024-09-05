import { use } from 'react';

import { AlertDialogContext } from '../contexts/alert-dialog-context';

export const useAlertDialog = () => {
  return use(AlertDialogContext);
};

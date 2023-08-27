import { Button } from '../../../_components/button';
import { Dialog } from '../../../_components/dialog';
import { DialogContent } from '../../../_components/dialog/dialog-content';
import { DialogTrigger } from '../../../_components/dialog/dialog-trigger';
import { LoginDialog } from '../login-dialog';

import type { FC } from 'react';

export const LoginButton: FC = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="medium">Login</Button>
      </DialogTrigger>
      <DialogContent>
        <LoginDialog />
      </DialogContent>
    </Dialog>
  );
};

import { DialogContent } from '../../../../components/elements/dialog';
import { ModalDialog } from '../_components/modal-dialog';

import type { FC } from 'react';

export type ModalLoginLayoutProps = LayoutProps<'/login'>;

const ModalLoginLayout: FC<ModalLoginLayoutProps> = ({
  children,
}) => {
  return (
    <ModalDialog>
      <DialogContent withClose>
        {children}
      </DialogContent>
    </ModalDialog>
  );
};

export default ModalLoginLayout;

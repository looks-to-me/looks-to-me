import { DialogContent } from '../../../_components/dialog/dialog-content';
import { ModalDialog } from '../_components/modal-dialog';

import type { ModalLoginPageProps } from './page';
import type { LayoutProps } from '../../../_types/layout-props';
import type { FC } from 'react';

export type ModalLoginLayoutProps = ModalLoginPageProps & LayoutProps<{
  // empty
}>;

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

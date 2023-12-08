import * as styles from './layout.css';
import { DialogContent } from '../../../../../_components/dialog';
import { ModalDialog } from '../../../_components/modal-dialog';

import type { ModalUserPostDetailsPageProps } from './page';
import type { LayoutProps } from '../../../../../_types/layout-props';
import type { FC, ReactNode } from 'react';

export type ModalLoginLayoutProps = ModalUserPostDetailsPageProps & LayoutProps<{
  header: ReactNode;
  main: ReactNode;
}>;

const ModalLoginLayout: FC<ModalLoginLayoutProps> = ({
  header,
  main,
  children,
}) => {
  return (
    <ModalDialog>
      <DialogContent>
        <article className={styles.article}>
          {header}
          {main}
          {children}
        </article>
      </DialogContent>
    </ModalDialog>
  );
};

export default ModalLoginLayout;

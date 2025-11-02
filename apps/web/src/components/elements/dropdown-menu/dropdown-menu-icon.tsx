import * as styles from './dropdown-menu.css';

import type { ReactElement, FC } from 'react';

export type DropdownMenuIconProps = {
  children: ReactElement;
};

export const DropdownMenuIcon: FC<DropdownMenuIconProps> = ({
  children,
}) => {
  return (
    <div className={styles.icon}>
      {children}
    </div>
  );
};

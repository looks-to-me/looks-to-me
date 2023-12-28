import * as styles from './drop-down-menu.css';

import type { ReactElement , FC } from 'react';

export type DropDownMenuIconProps = {
  children: ReactElement;
};

export const DropDownMenuIcon: FC<DropDownMenuIconProps> = ({
  children,
}) => {
  return (
    <div className={styles.icon}>
      {children}
    </div>
  );
};

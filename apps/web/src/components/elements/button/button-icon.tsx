import * as styles from './button.css';

import type { ReactElement , FC } from 'react';

export type ButtonIconProps = {
  children: ReactElement;
};

export const ButtonIcon: FC<ButtonIconProps> = ({
  children,
}) => {
  return (
    <div className={styles.icon}>
      {children}
    </div>
  );
};

import * as styles from './layout.css';

import type { FC } from 'react';

export type MainLayoutProps = LayoutProps<'/'>;

const MainLayout: FC<MainLayoutProps> = ({
  children,
  header,
  modal,
}) => {
  return (
    <div className={styles.container}>
      {header}
      <main className={styles.main}>
        {children}
      </main>
      {modal}
    </div>
  );
};

export default MainLayout;

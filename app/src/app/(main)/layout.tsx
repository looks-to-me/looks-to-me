import type { FC, ReactNode } from 'react';

export type MainLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({
  children,
  modal,
}) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default MainLayout;

import type { FC, ReactNode } from 'react';

export type MainLayoutProps = {
  children: ReactNode;
  auth: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({
  children,
  auth,
}) => {
  return (
    <>
      {children}
      {auth}
    </>
  );
};

export default MainLayout;

import type { LayoutProps } from '../../types/layout-props';
import type { FC, ReactNode } from 'react';

export type MainLayoutProps = LayoutProps<{
  modal: ReactNode;
}>;

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

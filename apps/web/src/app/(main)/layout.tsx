import type { FC } from 'react';

export type MainLayoutProps = LayoutProps<'/'>;

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

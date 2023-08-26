import { HeaderPresenter } from './header-presenter';
import { getUserMetadata } from '../../../_libs/auth/server/get-user-metadata';

import type { ComponentPropsWithoutRef , FC } from 'react';

export type HeaderProps = ComponentPropsWithoutRef<'header'>;

export const Header: FC<HeaderProps> = async ({
  children,
  ...props
}) => {
  const userMetadata = await getUserMetadata();

  return (
    <HeaderPresenter {...props} userMetadata={userMetadata}>
      {children}
    </HeaderPresenter>
  );
};

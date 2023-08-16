import { HeaderPresenter } from './header-presenter';
import { getAuthUser } from '../../../_libs/auth/server/get-auth-user';

import type { ComponentPropsWithoutRef , FC } from 'react';

export type HeaderProps = ComponentPropsWithoutRef<'header'>;

export const Header: FC<HeaderProps> = async ({
  children,
  ...props
}) => {
  const authUser = await getAuthUser();

  return (
    <HeaderPresenter {...props} authUser={authUser}>
      {children}
    </HeaderPresenter>
  );
};

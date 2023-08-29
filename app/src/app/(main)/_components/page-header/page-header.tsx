import { PageHeaderPresenter } from './page-header-presenter';
import { getUserMetadata } from '../../../_libs/auth/server/get-user-metadata';
import { findUserProviderByTypeAndSub } from '../../_repositories/user-provider-repository';
import { findUserById } from '../../_repositories/user-repository';

import type { UserEntity } from '../../_repositories/user-repository';
import type { ComponentPropsWithoutRef , FC } from 'react';

export type PageHeaderProps = ComponentPropsWithoutRef<'header'>;

const getUser = async (): Promise<UserEntity | undefined> => {
  const userMetadata = await getUserMetadata();
  if (!userMetadata) return;
  
  const userProvider = await findUserProviderByTypeAndSub(userMetadata.provider, userMetadata.sub);
  if (!userProvider) return;
  
  return await findUserById(userProvider.userId);
};

export const PageHeader: FC<PageHeaderProps> = async ({
  children,
  ...props
}) => {
  const user = await getUser();

  return (
    <PageHeaderPresenter {...props} user={user}>
      {children}
    </PageHeaderPresenter>
  );
};

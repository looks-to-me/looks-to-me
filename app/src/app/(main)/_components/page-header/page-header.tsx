import { PageHeaderPresenter } from './page-header-presenter';
import { getUserMetadata } from '../../../_libs/auth/server/get-user-metadata';

import type { ComponentPropsWithoutRef , FC } from 'react';

export type PageHeaderProps = ComponentPropsWithoutRef<'header'>;

export const PageHeader: FC<PageHeaderProps> = async ({
  children,
  ...props
}) => {
  const userMetadata = await getUserMetadata();

  return (
    <PageHeaderPresenter {...props} userMetadata={userMetadata}>
      {children}
    </PageHeaderPresenter>
  );
};

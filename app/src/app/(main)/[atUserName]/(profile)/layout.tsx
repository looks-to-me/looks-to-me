import { PageHeader } from '../../_components/page-header';
import { getUserName } from '../_helpers/getUserName';

import type { UserProfilePageProps } from './page';
import type { LayoutProps } from '../../../_types/layout-props';
import type { Metadata } from 'next';
import type { FC } from 'react';

export const generateMetadata = (
  { params: { atUserName } }: UserProfilePageProps,
): Metadata => {
  const userName = getUserName(atUserName);
  // TODO: get display name
  return {
    title: userName ?? 'not found',
    robots: 'noindex',
  };
};

export type UserProfileLayoutProps = UserProfilePageProps & LayoutProps<{
  // empty
}>;

const UserProfileLayout: FC<UserProfileLayoutProps> = ({ children }) => {
  return (
    <>
      <PageHeader />
      <main>{children}</main>
    </>
  );
};

export default UserProfileLayout;

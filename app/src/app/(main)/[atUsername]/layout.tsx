import { getUserName } from './_helpers/getUserName';
import { PageHeader } from '../_components/page-header';

import type { UserProfilePageProps } from './_types/userProfilePageProps';
import type { Metadata } from 'next';
import type { FC, ReactNode } from 'react';

export const generateMetadata = (
  { params: { atUsername } }: UserProfilePageProps,
): Metadata => {
  const username = getUserName(atUsername);
  // TODO: get display name
  return {
    title: username ?? 'not found',
    robots: 'noindex',
  };
};

export type UserProfileLayoutProps = {
  children: ReactNode;
};

const UserProfileLayout: FC<UserProfileLayoutProps> = ({ children }) => {
  return (
    <>
      <PageHeader />
      <main>{children}</main>
    </>
  );
};

export default UserProfileLayout;

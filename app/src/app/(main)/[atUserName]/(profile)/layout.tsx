import { Breadcrumbs, BreadcrumbsItem } from '../../../_components/breadcrumbs';
import { PageHeader } from '../../_components/page-header';
import { PageLayout } from '../../_components/page-layout';
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

const UserProfileLayout: FC<UserProfileLayoutProps> = ({
  params,
  children,
}) => {
  const userName = getUserName(params.atUserName);

  return (
    <PageLayout
      header={(
        <PageHeader>
          <Breadcrumbs>
            <BreadcrumbsItem href={`/@${userName}`}>
              {userName}
            </BreadcrumbsItem>
          </Breadcrumbs>
        </PageHeader>
      )}
    >
      <main>
        {children}
      </main>
    </PageLayout>
  );
};

export default UserProfileLayout;

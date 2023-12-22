import { ApplicationHeader } from '../../../../../components/domains/application/application-header';
import { Breadcrumbs, BreadcrumbsItem } from '../../../../../components/elements/breadcrumbs';
import { getLoginUser } from '../../../../../queries/user/get-login-user';

import type { PageProps } from '../../../../../types/page-props';
import type { SettingsPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type HomeHeaderPageProps = SettingsPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const SettingsHomeHeaderPage: FC<HomeHeaderPageProps> = async () => {
  const loginUser = await getLoginUser();

  return (
    <ApplicationHeader user={loginUser}>
      <Breadcrumbs>
        <BreadcrumbsItem href="/settings">
          Settings
        </BreadcrumbsItem>
      </Breadcrumbs>
    </ApplicationHeader>
  );
};

export default SettingsHomeHeaderPage;

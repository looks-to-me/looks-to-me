import { ApplicationHeader } from '../../../../components/domains/application/application-header';
import { Breadcrumbs, BreadcrumbsItem } from '../../../../components/elements/breadcrumbs';
import { getLoginUser } from '../../../../queries/user/get-login-user';

import type { PageProps } from '../../../../types/page-props';
import type { PrivacyPolicyPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type PrivacyPolicyHeaderPageProps = PrivacyPolicyPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const PrivacyPolicyHeaderPage: FC<PrivacyPolicyHeaderPageProps> = async () => {
  const loginUser = await getLoginUser();

  return (
    <ApplicationHeader user={loginUser}>
      <Breadcrumbs>
        <BreadcrumbsItem href="/privacy">
          Privacy Policy
        </BreadcrumbsItem>
      </Breadcrumbs>
    </ApplicationHeader>
  );
};

export default PrivacyPolicyHeaderPage;

import { ApplicationHeader } from '../../../../components/domains/application/application-header';
import { Breadcrumbs, BreadcrumbsItem } from '../../../../components/elements/breadcrumbs';
import { getLoginUser } from '../../../../queries/user/get-login-user';

import type { PageProps } from '../../../../types/page-props';
import type { TermsOfUsePageProps } from '../page';
import type { FC } from 'react';

export type TermsOfUseHeaderPageProps = TermsOfUsePageProps & PageProps<{
  params: Promise<{
    // empty
  }>;
  searchParams: Promise<{
    // empty
  }>;
}>;

const TermsOfUseHeaderPage: FC<TermsOfUseHeaderPageProps> = async () => {
  const loginUser = await getLoginUser();

  return (
    <ApplicationHeader user={loginUser}>
      <Breadcrumbs>
        <BreadcrumbsItem href="/terms">
          Terms of Use
        </BreadcrumbsItem>
      </Breadcrumbs>
    </ApplicationHeader>
  );
};

export default TermsOfUseHeaderPage;

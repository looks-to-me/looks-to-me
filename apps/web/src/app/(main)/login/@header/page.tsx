import { ApplicationHeader } from '../../../../components/domains/application/application-header';
import { Breadcrumbs, BreadcrumbsItem } from '../../../../components/elements/breadcrumbs';
import { getLoginUser } from '../../../../queries/user/get-login-user';

import type { PageProps } from '../../../../types/page-props';
import type { LoginPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type LoginHeaderPageProps = LoginPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const LoginHeaderPage: FC<LoginHeaderPageProps> = async () => {
  const loginUser = await getLoginUser();

  return (
    <ApplicationHeader user={loginUser}>
      <Breadcrumbs>
        <BreadcrumbsItem href="/login">
          Login
        </BreadcrumbsItem>
      </Breadcrumbs>
    </ApplicationHeader>
  );
};

export default LoginHeaderPage;

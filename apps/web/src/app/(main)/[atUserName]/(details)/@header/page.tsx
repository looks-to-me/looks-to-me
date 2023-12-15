import { ApplicationHeader } from '../../../../../components/domains/application/application-header';
import { Breadcrumbs, BreadcrumbsItem } from '../../../../../components/elements/breadcrumbs';
import { getLoginUser } from '../../../../_queries/user/get-login-user';
import { getUserName } from '../../_helpers/get-user-name';

import type { PageProps } from '../../../../../types/page-props';
import type { UserDetailsPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserDetailsHeaderPageProps = UserDetailsPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const UserDetailsHeaderPage: FC<UserDetailsHeaderPageProps> = async ({
  params,
}) => {
  const loginUser = await getLoginUser();
  const userName = getUserName(params.atUserName);

  return (
    <ApplicationHeader user={loginUser}>
      <Breadcrumbs>
        <BreadcrumbsItem href={`/@${userName}`}>
          {userName}
        </BreadcrumbsItem>
      </Breadcrumbs>
    </ApplicationHeader>
  );
};

export default UserDetailsHeaderPage;

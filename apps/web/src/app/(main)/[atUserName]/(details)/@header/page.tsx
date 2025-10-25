import { ApplicationHeader } from '../../../../../components/domains/application/application-header';
import { Breadcrumbs, BreadcrumbsItem } from '../../../../../components/elements/breadcrumbs';
import { getLoginUser } from '../../../../../queries/user/get-login-user';
import { getUserName } from '../../_helpers/get-user-name';

import type { FC } from 'react';

export type UserDetailsHeaderPageProps = PageProps<'/[atUserName]'>;

const UserDetailsHeaderPage: FC<UserDetailsHeaderPageProps> = async ({
  params,
}) => {
  const { atUserName } = await params;
  const loginUser = await getLoginUser();
  const userName = getUserName(atUserName);

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

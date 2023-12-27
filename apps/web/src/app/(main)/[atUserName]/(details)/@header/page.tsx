import { ApplicationHeader } from '../../../../../components/domains/application/application-header';
import { Breadcrumbs, BreadcrumbsItem } from '../../../../../components/elements/breadcrumbs';
import { getLoginUser } from '../../../../../queries/user/get-login-user';
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
  
  //TODO: Make it retrieve the user's mute status.
  return (
    <ApplicationHeader
      user={loginUser}
      bannerProps={{ children: 'This user is currently muted.' }}
    >
      <Breadcrumbs>
        <BreadcrumbsItem href={`/@${userName}`}>
          {userName}
        </BreadcrumbsItem>
      </Breadcrumbs>
    </ApplicationHeader>
  );
};

export default UserDetailsHeaderPage;

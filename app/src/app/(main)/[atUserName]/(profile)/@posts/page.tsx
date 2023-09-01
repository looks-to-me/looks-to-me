import type { PageProps } from '../../../../_types/page-props';
import type { UserProfilePageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type UserProfileMainPageProps = UserProfilePageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const UserProfileMainPage: FC<UserProfileMainPageProps> = async ({
  params,
}) => {
  return (
    <div>
      <p>main</p>
      <p>{params.atUserName}</p>
    </div>
  );
};

export default UserProfileMainPage;

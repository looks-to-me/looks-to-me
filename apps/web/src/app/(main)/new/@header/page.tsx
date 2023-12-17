import { ApplicationHeader } from '../../../../components/domains/application/application-header';
import { Breadcrumbs, BreadcrumbsItem } from '../../../../components/elements/breadcrumbs';
import { getLoginUser } from '../../../../queries/user/get-login-user';

import type { PageProps } from '../../../../types/page-props';
import type { NewPostPageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type NewPostHeaderPageProps = NewPostPageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const NewPostHeaderPage: FC<NewPostHeaderPageProps> = async () => {
  const loginUser = await getLoginUser();

  return (
    <ApplicationHeader user={loginUser}>
      <Breadcrumbs>
        <BreadcrumbsItem href="/new">
          New post
        </BreadcrumbsItem>
      </Breadcrumbs>
    </ApplicationHeader>
  );
};

export default NewPostHeaderPage;

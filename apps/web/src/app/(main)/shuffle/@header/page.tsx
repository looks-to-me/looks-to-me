import { ApplicationHeader } from '../../../../components/domains/application/application-header';
import { Breadcrumbs, BreadcrumbsItem } from '../../../../components/elements/breadcrumbs';
import { getLoginUser } from '../../../_queries/user/get-login-user';

import type { PageProps } from '../../../_types/page-props';
import type { ShufflePageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type ShuffleHeaderPageProps = ShufflePageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const ShuffleHeaderPage: FC<ShuffleHeaderPageProps> = async () => {
  const loginUser = await getLoginUser();

  return (
    <ApplicationHeader user={loginUser}>
      <Breadcrumbs>
        <BreadcrumbsItem href="/shuffle">
          Shuffle
        </BreadcrumbsItem>
      </Breadcrumbs>
    </ApplicationHeader>
  );
};

export default ShuffleHeaderPage;

import { Breadcrumbs, BreadcrumbsItem } from '../../../../components/elements/breadcrumbs';

import type { FC } from 'react';

export type HeaderLoginPageProps = PageProps<'/login'>;

const HeaderLoginPage: FC<HeaderLoginPageProps> = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbsItem href="/login">
        Login
      </BreadcrumbsItem>
    </Breadcrumbs>
  );
};

export default HeaderLoginPage;

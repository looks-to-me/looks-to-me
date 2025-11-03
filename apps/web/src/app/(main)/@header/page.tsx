import { Breadcrumbs, BreadcrumbsItem } from '../../../components/elements/breadcrumbs';

import type { FC } from 'react';

export type HeaderHomePageProps = PageProps<'/'>;

const HeaderHomePage: FC<HeaderHomePageProps> = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbsItem href="/">
        Home
      </BreadcrumbsItem>
    </Breadcrumbs>
  );
};

export default HeaderHomePage;

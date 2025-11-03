import { Breadcrumbs, BreadcrumbsItem } from '../../../../components/elements/breadcrumbs';

import type { FC } from 'react';

export type HeaderTermsOfUsePageProps = PageProps<'/terms'>;

const HeaderTermsOfUsePage: FC<HeaderTermsOfUsePageProps> = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbsItem href="/terms">
        Terms of Use
      </BreadcrumbsItem>
    </Breadcrumbs>
  );
};

export default HeaderTermsOfUsePage;

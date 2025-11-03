import { Breadcrumbs, BreadcrumbsItem } from '../../../../components/elements/breadcrumbs';

import type { FC } from 'react';

export type HeaderPrivacyPolicyPageProps = PageProps<'/privacy'>;

const HeaderPrivacyPolicyPage: FC<HeaderPrivacyPolicyPageProps> = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbsItem href="/privacy">
        Privacy Policy
      </BreadcrumbsItem>
    </Breadcrumbs>
  );
};

export default HeaderPrivacyPolicyPage;

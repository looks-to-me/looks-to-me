import { Breadcrumbs, BreadcrumbsItem } from '../../../../components/elements/breadcrumbs';

import type { FC } from 'react';

export type HeaderSettingsPageProps = PageProps<'/settings'>;

const HeaderSettingsPage: FC<HeaderSettingsPageProps> = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbsItem href="/settings">
        Settings
      </BreadcrumbsItem>
    </Breadcrumbs>
  );
};

export default HeaderSettingsPage;

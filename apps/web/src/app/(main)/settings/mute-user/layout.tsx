import * as styles from './layout.css';
import { Breadcrumbs, BreadcrumbsItem } from '../../../_components/breadcrumbs';
import { createMetadata } from '../../../_helpers/create-metadata';
import { PageHeader } from '../../_components/page-header';
import { PageLayout } from '../../_components/page-layout';
import { SettingsNavigationLayout } from '../_components/settings-navigation-layout';

import type { SettingPageProps } from './page';
import type { LayoutProps } from '../../../_types/layout-props';
import type { FC } from 'react';

export const metadata = createMetadata({
  title: 'Muted Users',
});

export type MuteUserSettingLayoutProps = SettingPageProps & LayoutProps<{
  // empty
}>;

const MuteUserSettingLayout: FC<MuteUserSettingLayoutProps> = ({
  children,
}) => {
  return (
    <PageLayout
      header={(
        <PageHeader>
          <Breadcrumbs>
            <BreadcrumbsItem href="/settings">
              Setting
            </BreadcrumbsItem>
            <BreadcrumbsItem href="/settings/mute-user">
              Muted Users
            </BreadcrumbsItem>
          </Breadcrumbs>
        </PageHeader>
      )}
    >
      <main className={styles.main}>
        <SettingsNavigationLayout>
          {children}
        </SettingsNavigationLayout>
      </main>
    </PageLayout>
  );
};

export default MuteUserSettingLayout;

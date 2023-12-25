import * as styles from './page.css';

import type { PageProps } from '../../../../../types/page-props';
import type { SettingsHomePageProps } from '../page';
import type { FC } from 'react';

export const runtime = 'edge';

export type SettingsHomeMainPageProps = SettingsHomePageProps & PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const SettingsHomeMainPage: FC<SettingsHomeMainPageProps> = () => {

  return (
    <div className={styles.wrapper}>
      {/* TODO: Display a list of muted users */}
    </div>
  );
};

export default SettingsHomeMainPage;

import * as styles from './page.css';
import { UserMuteList } from '../../../components/domains/user/user-mute-list';
import { graphqlExecutor } from '../../../graphql';
import { graphql } from '../../../graphql/generated';
import { createMetadata } from '../../../helpers/create-metadata';

import type { Metadata } from 'next';
import type { FC } from 'react';

const SettingsPageQuery = graphql(/** GraphQL */ `
  query SettingsPage {
    ...UserMuteListFragment
  }
`);

export const metadata: Metadata = createMetadata({
  title: 'Settings',
});

export type SettingsHomePageProps = PageProps<'/settings'>;

const SettingsHomePage: FC<SettingsHomePageProps> = async () => {
  const data = await graphqlExecutor({ document: SettingsPageQuery });

  return (
    <div className={styles.wrapper}>
      <h2>Muted Users</h2>
      <UserMuteList fragment={data} />
    </div>
  );
};

export default SettingsHomePage;

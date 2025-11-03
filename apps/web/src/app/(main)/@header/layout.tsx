import * as styles from './layout.css';
import { ApplicationHeader, ApplicationHeaderSection } from '../../../components/domains/application/application-header';
import { ApplicationLogo } from '../../../components/domains/application/application-logo';
import { ApplicationNavigation } from '../../../components/domains/application/application-navigation';
import { UserAccountMenu } from '../../../components/domains/user/user-account-menu';
import { graphqlExecutor } from '../../../graphql';
import { graphql } from '../../../graphql/generated';
import { LoginButton } from '../_components/login-button';
import { NewPostButton } from '../_components/new-post-button';

import type { FC } from 'react';

const HeaderLayoutQuery = graphql(/** GraphQL */ `
  query HeaderLayout {
    me {
      ...UserAccountMenuFragment
    }
  }
`);

export type HeaderLayoutProps = LayoutProps<'/'>;

const HeaderLayout: FC<HeaderLayoutProps> = async ({
  children,
}) => {
  const data = await graphqlExecutor({ document: HeaderLayoutQuery });

  return (
    <ApplicationHeader>
      <ApplicationHeaderSection align="start">
        <ApplicationNavigation />
        <ApplicationLogo className={styles.logo} />
        {children}
      </ApplicationHeaderSection>
      <ApplicationHeaderSection align="end">
        <NewPostButton />
        {data.me ? (
          <UserAccountMenu fragment={data.me} />
        ) : (
          <LoginButton />
        )}
      </ApplicationHeaderSection>
    </ApplicationHeader>
  );
};

export default HeaderLayout;

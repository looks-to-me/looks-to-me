import * as styles from './layout.css';
import { ApplicationLayout } from '../../../components/domains/application/application-layout';
import { createMetadata } from '../../../helpers/create-metadata';

import type { FC } from 'react';

export const metadata = createMetadata({
  title: 'Privacy Policy',
});

export type PrivacyPolicyLayoutProps = LayoutProps<'/privacy'>;

const PrivacyPolicyLayout: FC<PrivacyPolicyLayoutProps> = ({
  children,
  header,
}) => {
  return (
    <ApplicationLayout header={header}>
      <main className={styles.main}>
        {children}
      </main>
    </ApplicationLayout>
  );
};

export default PrivacyPolicyLayout;

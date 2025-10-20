import * as styles from './layout.css';
import { ApplicationLayout } from '../../../components/domains/application/application-layout';
import { createMetadata } from '../../../helpers/create-metadata';

import type { FC } from 'react';

export const metadata = createMetadata({
  title: 'Terms of Use',
});

export type TermsOfUseLayoutProps = LayoutProps<'/terms'>;

const TermsOfUseLayout: FC<TermsOfUseLayoutProps> = ({
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

export default TermsOfUseLayout;

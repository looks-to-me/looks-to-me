import * as styles from './layout.css';
import { ApplicationLayout } from '../../../components/domains/application/application-layout';
import { createMetadata } from '../../../helpers/create-metadata';

import type { TermsOfUsePageProps } from './page';
import type { LayoutProps } from '../../_types/layout-props';
import type { FC, ReactNode } from 'react';

export const metadata = createMetadata({
  title: 'Terms of Use',
});

export type TermsOfUseLayoutProps = TermsOfUsePageProps & LayoutProps<{
  header: ReactNode;
}>;

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

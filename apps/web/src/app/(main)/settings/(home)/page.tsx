import type { PageProps } from '../../../../types/page-props';
import type { FC } from 'react';

export type SettingsHomePageProps = PageProps<{
  params: Promise<{
    // empty
  }>;
  searchParams: Promise<{
    // empty
  }>;
}>;

const SettingsHomePage: FC<SettingsHomePageProps> = () => {
  return null;
};

export default SettingsHomePage;

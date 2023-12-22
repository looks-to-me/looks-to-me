import type { PageProps } from '../../../../types/page-props';
import type { FC } from 'react';

export const runtime = 'edge';

export type SettingsPageProps = PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const SettingsPage: FC<SettingsPageProps> = () => {
  return null;
};

export default SettingsPage;

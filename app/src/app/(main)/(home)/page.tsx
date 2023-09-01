import type { PageProps } from '../../_types/page-props';
import type { FC } from 'react';

export const runtime = 'edge';

export type HomePageProps = PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const HomePage: FC<HomePageProps> = () => {
  return null;
};

export default HomePage;

import type { PageProps } from '../../../types/page-props';
import type { FC } from 'react';

export const runtime = 'edge';

export type HomePageProps = PageProps<{
  params: Promise<{
    // empty
  }>;
  searchParams: Promise<{
    // empty
  }>;
}>;

const HomePage: FC<HomePageProps> = () => {
  return null;
};

export default HomePage;

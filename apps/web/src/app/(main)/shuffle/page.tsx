import type { PageProps } from '../../../types/page-props';
import type { FC } from 'react';

export const runtime = 'edge';

export type ShufflePageProps = PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const ShufflePage: FC<ShufflePageProps> = () => {
  return null;
};

export default ShufflePage;

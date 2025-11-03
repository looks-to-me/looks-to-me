import { Breadcrumbs, BreadcrumbsItem } from '../../../../components/elements/breadcrumbs';

import type { FC } from 'react';

export type HeaderShufflePageProps = PageProps<'/shuffle'>;

const HeaderShufflePage: FC<HeaderShufflePageProps> = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbsItem href="/shuffle">
        Shuffle
      </BreadcrumbsItem>
    </Breadcrumbs>
  );
};

export default HeaderShufflePage;

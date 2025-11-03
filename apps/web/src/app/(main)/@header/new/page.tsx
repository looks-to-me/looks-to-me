import { Breadcrumbs, BreadcrumbsItem } from '../../../../components/elements/breadcrumbs';

import type { FC } from 'react';

export type HeaderNewPostPageProps = PageProps<'/new'>;

const HeaderNewPostPage: FC<HeaderNewPostPageProps> = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbsItem href="/new">
        New post
      </BreadcrumbsItem>
    </Breadcrumbs>
  );
};

export default HeaderNewPostPage;

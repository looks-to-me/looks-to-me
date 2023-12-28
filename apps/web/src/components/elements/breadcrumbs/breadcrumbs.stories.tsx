import { Breadcrumbs } from './breadcrumbs';
import { BreadcrumbsItem } from './breadcrumbs-item';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Breadcrumbs,
} as Meta<typeof Breadcrumbs>;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default = {
  args: {
    children: (
      <BreadcrumbsItem href="/@user_name">UserName</BreadcrumbsItem>
    ),
  },
} satisfies Story;

export const Multiple = {
  args: {
    children: (
      <>
        <BreadcrumbsItem href="/@user_name">UserName</BreadcrumbsItem>
        <BreadcrumbsItem href="/@user_name/posts/id">Looks Good To Me</BreadcrumbsItem>
      </>
    ),
  },
} satisfies Story;

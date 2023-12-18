import { useState } from 'react';

import { DraggableInputTags } from './draggable-input-tags';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: DraggableInputTags,
} as Meta<typeof DraggableInputTags>;

type Story = StoryObj<typeof DraggableInputTags>;

export const Default = {
  render: function Render() {
    const [tags, setTags] = useState<string[]>([
      'GOOD',
      'Green',
      'Dragon',
      'Fire',
    ]);
    return <DraggableInputTags tags={tags} setTags={setTags} />;
  },
} satisfies Story;

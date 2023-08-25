import { ScrollArea } from './scroll-area';
import { ScrollAreaViewport } from './scroll-area-viewport';
import { ScrollAreaScrollbar } from './scroll-area-scrollbar';
import { ScrollAreaThumb } from './scroll-area-thumb';
import { ScrollAreaCorner } from './scroll-area-corner';

import type { Meta, StoryObj } from '@storybook/react';


export default {
  component: ScrollArea,
} as Meta<typeof ScrollArea>;

type Story = StoryObj<typeof ScrollArea>;

const TAGS = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export const Default = {
  args: {
    children: (
      <>
        <ScrollAreaViewport className="ScrollAreaViewport">
          <div style={{ padding: '15px 20px' }}>
            <div className="Text">Tags</div>
            {TAGS.map((tag) => (
              <div className="Tag" key={tag}>
                {tag}
              </div>
            ))}
          </div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar className="ScrollAreaScrollbar" orientation="vertical">
          <ScrollAreaThumb className="ScrollAreaThumb" />
        </ScrollAreaScrollbar>
        <ScrollAreaScrollbar className="ScrollAreaScrollbar" orientation="horizontal">
          <ScrollAreaThumb className="ScrollAreaThumb" />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner className="ScrollAreaCorner" />
      </>
    ),
  },
} satisfies Story;

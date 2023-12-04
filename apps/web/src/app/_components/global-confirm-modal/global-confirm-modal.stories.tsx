import { useState } from 'react';

import { GlobalConfirmModalProvider, useGlobalConfirmModal } from './global-confirm-modal';
import LooksToMeWithTextWhite from '../../_icons/looks-to-me-with-text-white.svg';
import { Button } from '../button';

import type { ShowModalProps } from './global-confirm-modal';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: GlobalConfirmModalProvider,
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],

} as Meta<typeof GlobalConfirmModalProvider>;

type Story = StoryObj<typeof GlobalConfirmModalProvider>;

export const Default = {
  args: {},
  render: function Comp() {
    const { openModal } = useGlobalConfirmModal();
    const modalPropsArray: ({ buttonLabel: string } & ShowModalProps)[] = [
      { buttonLabel: 'short text', description: 'Are you sure you want to delete this post?', title: 'Delete Post' },
      { buttonLabel: 'long Text', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ratione aliquid, odit dolor excepturi eum amet sapiente illum fugit eveniet iure, nam quidem nostrum tenetur omnis, minus nihil saepe quos.', title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ratione aliquid, odit dolor excepturi eum amet sapiente illum fugit eveniet iure, nam quidem nostrum tenetur omnis, minus nihil saepe quos.' },
      { buttonLabel: 'emoji', description: '👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪👪', title: '😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇😇' },
      { buttonLabel: 'component', description: <LooksToMeWithTextWhite style={{ fontSize: '100px', width: '100%' }} />, title: <div style={{ color: 'green' }}>title green</div> },
    ];
    const [result, setResult] = useState<boolean[]>([]);
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '10px' }}>
        {modalPropsArray.map((props) => {
          const handleOnClick = async () => {
            const result = await openModal(props);
            setResult(previous => [...previous, result]);
          };
          return (
            <Button
              key={props.buttonLabel}
              onClick={handleOnClick}
            >
              {props.buttonLabel}
            </Button>
          );
        },
        )}
        <div>
          <h2>Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>

      </div>
    );
  },
} satisfies Story;

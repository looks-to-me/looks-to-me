import { useState } from 'react';

import { AlertDialogProvider, useAlertDialog } from './alert-dialog-provider';
import LooksToMeWithTextWhite from '../../_icons/looks-to-me-with-text-white.svg';
import { Button } from '../button';

import type { OpenAlertDialogProps  } from './alert-dialog-provider';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AlertDialogProvider,
} as Meta<typeof AlertDialogProvider>;

type Story = StoryObj<typeof AlertDialogProvider>;

const modalPropsObject = {
  shortText: { description: 'Are you sure you want to delete this post?', title: 'Delete Post' },
  longText: {
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ratione aliquid, odit dolor excepturi eum amet sapiente illum fugit eveniet iure, nam quidem nostrum tenetur omnis, minus nihil saepe quos.',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ratione aliquid, odit dolor excepturi eum amet sapiente illum fugit eveniet iure, nam quidem nostrum tenetur omnis, minus nihil saepe quos.',
  },
  component: {
    description: <LooksToMeWithTextWhite style={{ fontSize: '100px', width: '100%' }} />,
    title: <div style={{ color: 'green' }}>title green</div>,
  },
} as const satisfies Record<string, OpenAlertDialogProps >;

const ShowGlobalConfirmModalButton = (props: {
  displayButtonLabel: string;
  modalProps: OpenAlertDialogProps ;
}) => {
  const { displayButtonLabel, modalProps } = props;
  const { openModal } = useAlertDialog();
  const [result, setResult] = useState<boolean[]>([]);

  const handleOnClick = async () => {
    const result = await openModal(modalProps);
    setResult((previous) => [...previous, result]);
  };
  
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '10px' }}>
      <Button onClick={handleOnClick}>{displayButtonLabel}</Button>
      <div>
        <h2>Result</h2>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

export const shortText = {
  args: {
    children: (
      <ShowGlobalConfirmModalButton
        displayButtonLabel="shortText"
        modalProps={modalPropsObject['shortText']}
      />
    ),
  },
} satisfies Story;

export const longText = {
  args: {
    children: (
      <ShowGlobalConfirmModalButton
        displayButtonLabel="longText"
        modalProps={modalPropsObject['longText']}
      />
    ),
  },
} satisfies Story;

export const component = {
  args: {
    children: (
      <ShowGlobalConfirmModalButton
        displayButtonLabel="component"
        modalProps={modalPropsObject['component']}
      />
    ),
  },
} satisfies Story;
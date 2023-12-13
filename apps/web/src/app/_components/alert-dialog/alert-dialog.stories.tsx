import { useState } from 'react';

import { useAlertDialog } from '.';
import { AlertDialogProvider } from './alert-dialog-provider';
import { Button } from '../button';

import type { OpenAlertDialogProps } from './contexts/alert-dialog-context';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: AlertDialogProvider,
} as Meta<typeof AlertDialogProvider>;

type Story = StoryObj<typeof AlertDialogProvider>;

const defaultOpenAlertDialogProps: OpenAlertDialogProps = {
  title: '',
  description: '',
  acceptButton: <Button variant="danger">OK</Button>,
  rejectButton: <Button>Cancel</Button>,
};

const openAlertDialogPropsMap = {
  shortText: { 
    ...defaultOpenAlertDialogProps,
    title: 'Delete Post',
    description: 'Are you sure you want to delete this post?',
  },
  longText: {
    ...defaultOpenAlertDialogProps,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ratione aliquid, odit dolor excepturi eum amet sapiente illum fugit eveniet iure, nam quidem nostrum tenetur omnis, minus nihil saepe quos.',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ratione aliquid, odit dolor excepturi eum amet sapiente illum fugit eveniet iure, nam quidem nostrum tenetur omnis, minus nihil saepe quos.',
  },
  component: {
    ...defaultOpenAlertDialogProps,
    title: <div style={{ color: 'green' }}>title green</div>,
    description:  <div style={{ color: 'blue' }}>description blue</div>,
  },
} as const satisfies Record<string, OpenAlertDialogProps>;

const ShowAlertDialogButton = ({
  displayButtonLabel,
  openAlertDialogProps,
}: {
  displayButtonLabel: string;
  openAlertDialogProps: OpenAlertDialogProps ;
}) => {
  const { openAlertDialog } = useAlertDialog();
  const [result, setResult] = useState<boolean[]>([]);

  const handleOnClick = async () => {
    const result = await openAlertDialog(openAlertDialogProps);
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

export const Default = {
  args: {
    children: (
      <ShowAlertDialogButton
        displayButtonLabel="ShortText"
        openAlertDialogProps={openAlertDialogPropsMap.shortText}
      />
    ),
  },
} satisfies Story;

export const LongText = {
  args: {
    children: (
      <ShowAlertDialogButton
        displayButtonLabel="LongText"
        openAlertDialogProps={openAlertDialogPropsMap.longText}
      />
    ),
  },
} satisfies Story;

export const Component = {
  args: {
    children: (
      <ShowAlertDialogButton
        displayButtonLabel="Component"
        openAlertDialogProps={openAlertDialogPropsMap.component}
      />
    ),
  },
} satisfies Story;

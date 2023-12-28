'use client';

import { Toaster as SonnerToaster } from 'sonner';

import * as styles from './toaster.css';

import type { FC } from 'react';

export type ToasterProps = {
  // nothing
};

export const Toaster: FC<ToasterProps> = () => {
  return (
    <SonnerToaster
      toastOptions={{
        className: styles.toast,
        descriptionClassName: styles.description,
      }}
    />
  );
};

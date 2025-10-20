'use client';

import { clsx } from 'clsx';
import { XIcon } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';

import * as styles from './dialog.css';
import { AccessibleIcon } from '../accessible-icon';
import { Button, ButtonIcon } from '../button';

import type { ComponentProps, FC } from 'react';

export type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
  withClose?: boolean;
};

export const DialogContent: FC<DialogContentProps> = ({
  className,
  children,
  withClose,
  ...props
}) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content
        {...props}
        className={clsx(className, styles.content)}
      >
        {children}
        {withClose && (
          <DialogPrimitive.Close asChild>
            <Button className={styles.close} variant="ghost" size="icon" borderless>
              <ButtonIcon>
                <AccessibleIcon label="Close">
                  <XIcon />
                </AccessibleIcon>
              </ButtonIcon>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

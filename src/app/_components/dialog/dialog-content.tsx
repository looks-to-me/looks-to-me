'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from './dialog.css';
import CloseIcon from '../../_icons/close.svg';
import { AccessibleIcon } from '../accessible-icon';
import { Button } from '../button';

import type { ElementRef , ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type DialogContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

const DialogContentRender: ForwardRefRenderFunction<ElementRef<typeof DialogPrimitive.Content>, DialogContentProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content
        {...props}
        ref={ref}
        className={clsx(className, styles.content)}
      >
        {children}
        <DialogPrimitive.Close asChild>
          <Button className={styles.close} variant="ghost" size="icon" borderless>
            <AccessibleIcon label="Close">
              <CloseIcon />
            </AccessibleIcon>
          </Button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export const DialogContent = forwardRef(DialogContentRender);

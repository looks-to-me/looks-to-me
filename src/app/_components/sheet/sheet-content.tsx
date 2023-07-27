'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { forwardRef } from 'react';

import * as styles from './sheet.css';
import CloseIcon from '../../_icons/close.svg';
import { AccessibleIcon } from '../accessible-icon';
import { Button } from '../button';

import type { RecipeVariants } from '@vanilla-extract/recipes';
import type { ElementRef , ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

type SheetContentVariants = NonNullable<RecipeVariants<typeof styles.content>>;

export type SheetContentSide = Exclude<SheetContentVariants['side'], undefined>;

export type SheetContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  side?: SheetContentSide | undefined;
};

const SheetContentRender: ForwardRefRenderFunction<ElementRef<typeof DialogPrimitive.Content>, SheetContentProps> = ({
  className,
  children,
  side = 'right',
  ...props
}, ref) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content
        {...props}
        ref={ref}
        className={clsx(className, styles.content({ side }))}
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

export const SheetContent = forwardRef(SheetContentRender);

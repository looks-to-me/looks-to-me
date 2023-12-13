'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { forwardRef, Children } from 'react';

import * as styles from './sheet.css';
import CloseIcon from '../../../app/_icons/close.svg';
import { AccessibleIcon } from '../accessible-icon';
import { Button, ButtonIcon } from '../button';
import { Separator } from '../separator';

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
        {Children.map(children, (child, index) => (
          <>
            {0 < index && <Separator />}
            {child}
          </>
        ))}
        <DialogPrimitive.Close asChild>
          <Button className={styles.close} variant="ghost" size="icon" borderless>
            <ButtonIcon>
              <AccessibleIcon label="Close">
                <CloseIcon />
              </AccessibleIcon>
            </ButtonIcon>
          </Button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export const SheetContent = forwardRef(SheetContentRender);

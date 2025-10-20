'use client';

import { clsx } from 'clsx';
import { XIcon } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { Children } from 'react';

import * as styles from './sheet.css';
import { AccessibleIcon } from '../accessible-icon';
import { Button, ButtonIcon } from '../button';
import { Separator } from '../separator';

import type { RecipeVariants } from '@vanilla-extract/recipes';
import type { ComponentProps, FC } from 'react';

type SheetContentVariants = NonNullable<RecipeVariants<typeof styles.content>>;

export type SheetContentSide = Exclude<SheetContentVariants['side'], undefined>;

export type SheetContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
  side?: SheetContentSide | undefined;
};

export const SheetContent: FC<SheetContentProps> = ({
  className,
  children,
  side = 'right',
  ...props
}) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content
        {...props}
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
                <XIcon />
              </AccessibleIcon>
            </ButtonIcon>
          </Button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

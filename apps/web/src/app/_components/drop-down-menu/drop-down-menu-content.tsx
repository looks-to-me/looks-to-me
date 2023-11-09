'use client';

import * as DropDownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import { Children, forwardRef } from 'react';

import * as styles from './drop-down-menu.css';
import { Separator } from '../separator';

import type { ElementRef , ComponentPropsWithoutRef, ForwardRefRenderFunction } from 'react';

export type DropDownMenuContentProps = Omit<ComponentPropsWithoutRef<typeof DropDownMenuPrimitive.Content>, 'sideOffset' | 'align'>;

const DropDownMenuContentRender: ForwardRefRenderFunction<ElementRef<typeof DropDownMenuPrimitive.Content>, DropDownMenuContentProps> = ({
  className,
  children,
  ...props
}, ref) => {
  return (
    <DropDownMenuPrimitive.Portal>
      <DropDownMenuPrimitive.Content
        {...props}
        ref={ref}
        align="end"
        sideOffset={4}
        className={clsx(className, styles.content)}
      >
        {Children.map(children, (child, index) => (
          <>
            {0 < index && <Separator />}
            {child}
          </>
        ))}
      </DropDownMenuPrimitive.Content>
    </DropDownMenuPrimitive.Portal>
  );
};

export const DropDownMenuContent = forwardRef(DropDownMenuContentRender);

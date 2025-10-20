import { clsx } from 'clsx';
import { Slot as SlotPrimitive } from 'radix-ui';
import { forwardRef } from 'react';

import * as styles from './sheet.css';

import type { ForwardRefRenderFunction, ComponentPropsWithoutRef } from 'react';

export type SheetSectionProps = ComponentPropsWithoutRef<'div'> & {
  asChild?: boolean | undefined;
};

const SheetSectionRender: ForwardRefRenderFunction<HTMLDivElement, SheetSectionProps> = ({
  className,
  children,
  asChild,
  ...props
}, ref) => {
  const Wrapper = asChild ? SlotPrimitive.Slot : 'div';

  return (
    <Wrapper
      {...props}
      ref={ref}
      className={clsx(className, styles.section)}
    >
      {children}
    </Wrapper>
  );
};

export const SheetSection = forwardRef(SheetSectionRender);

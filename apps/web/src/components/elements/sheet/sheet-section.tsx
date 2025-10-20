import { clsx } from 'clsx';
import { Slot as SlotPrimitive } from 'radix-ui';

import * as styles from './sheet.css';

import type { ComponentProps, FC } from 'react';

export type SheetSectionProps = ComponentProps<'div'> & {
  asChild?: boolean | undefined;
};

export const SheetSection: FC<SheetSectionProps> = ({
  className,
  children,
  asChild,
  ...props
}) => {
  const Wrapper = asChild ? SlotPrimitive.Slot : 'div';

  return (
    <Wrapper
      {...props}
      className={clsx(className, styles.section)}
    >
      {children}
    </Wrapper>
  );
};

import { clsx } from 'clsx';
import { Separator as SeparatorPrimitive } from 'radix-ui';
import { forwardRef } from 'react';

import * as styles from './separator.css';

import type { ForwardRefRenderFunction, ComponentPropsWithoutRef, ElementRef } from 'react';

export type SeparatorProps = ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
  // nothing
};

const SeparatorRender: ForwardRefRenderFunction<ElementRef<typeof SeparatorPrimitive.Root>, SeparatorProps> = ({
  className,
  decorative = false,
  orientation = 'horizontal',
  ...props
}, ref) => {
  return (
    <SeparatorPrimitive.Root
      {...props}
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={clsx(className, styles.wrapper({ orientation }))}
    />
  );
};

export const Separator = forwardRef(SeparatorRender);

import { clsx } from 'clsx';
import { Separator as SeparatorPrimitive } from 'radix-ui';

import * as styles from './separator.css';

import type { ComponentProps, FC } from 'react';

export type SeparatorProps = ComponentProps<typeof SeparatorPrimitive.Root> & {
  // nothing
};

export const Separator: FC<SeparatorProps> = ({
  className,
  decorative = false,
  orientation = 'horizontal',
  ...props
}) => {
  return (
    <SeparatorPrimitive.Root
      {...props}
      decorative={decorative}
      orientation={orientation}
      className={clsx(className, styles.wrapper({ orientation }))}
    />
  );
};

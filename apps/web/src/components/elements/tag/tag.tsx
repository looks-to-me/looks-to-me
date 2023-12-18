import { clsx } from 'clsx';
import { forwardRef } from 'react';

import * as styles from './tag.css';

import type { ForwardRefRenderFunction, ComponentPropsWithoutRef } from 'react';

export type TagProps = ComponentPropsWithoutRef<'div'> & {
  variant?: 'primary' | 'normal';
};

const TagRender: ForwardRefRenderFunction<HTMLDivElement, TagProps> = (
  { className, variant = 'normal', ...props },
  ref,
) => {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(className, styles.wrapper({ variant }))}
    >
      {props.children}
    </div>
  );
};

export const Tag = forwardRef(TagRender);

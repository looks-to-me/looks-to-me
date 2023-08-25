import clsx from 'clsx';

import * as styles from './tag-selector.css';

import type { FC } from 'react';
import { Popover } from '../../../../_components/popover';

export type TagSelectorProps = {
  className?: string | undefined;
};

export const TagSelector: FC<TagSelectorProps> = ({
  className,
}) => {
  return (
    <div className={clsx(className, styles.wrapper)}>
      <Popover>

      </Popover>

    </div>
  );
};

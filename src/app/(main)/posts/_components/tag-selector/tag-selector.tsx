import clsx from 'clsx';

import * as styles from './tag-selector.css';

import type { FC } from 'react';

export type TagSelectorProps = {
  className?: string | undefined;
};

export const TagSelector: FC<TagSelectorProps> = ({
  className,
}) => {
  return (
    <div className={clsx(className, styles.wrapper)}>


    </div>
  );
};

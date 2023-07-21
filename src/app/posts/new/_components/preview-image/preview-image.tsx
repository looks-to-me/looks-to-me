import clsx from 'clsx';

import * as styles from './preview-image.css';

import type { FC } from 'react';

export type PreviewImageProps = {
  className?: string | undefined;
};

export const PreviewImage: FC<PreviewImageProps> = ({
  className,
}) => {
  return (
    <div className={clsx(className, styles.wrapper)}>
    
    </div>
  );
};

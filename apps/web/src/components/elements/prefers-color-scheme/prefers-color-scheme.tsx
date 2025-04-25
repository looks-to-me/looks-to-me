import { cloneElement } from 'react';

import * as styles from './prefers-color-scheme.css';
import { mergeProps } from '../../../helpers/merge-props';

import type { FC, ReactElement } from 'react';

export type PrefersColorSchemeProps = {
  className?: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  light: ReactElement<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dark: ReactElement<any>;
};

export const PrefersColorScheme: FC<PrefersColorSchemeProps> = ({
  light,
  dark,
  ...props
}) => {
  return (
    <>
      {cloneElement(light, mergeProps(props, light.props, { className: styles.light }))}
      {cloneElement(dark, mergeProps(props, dark.props, { className: styles.dark }))}
    </>
  );
};

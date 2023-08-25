import { cloneElement } from 'react';

import * as styles from './prefers-color-scheme.css';
import { mergeProps } from '../../_helpers/mergeProps';

import type { FC, ReactElement } from 'react';

export type PrefersColorSchemeProps = {
  className?: string | undefined;
  light: ReactElement;
  dark: ReactElement;
};

export const PrefersColorScheme: FC<PrefersColorSchemeProps> = ({
  light,
  dark,
  ...props
}) => {
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
      {cloneElement(light, mergeProps(props, light.props, { className: styles.light }))}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
      {cloneElement(dark, mergeProps(props, dark.props, { className: styles.dark }))}
    </>
  );
};

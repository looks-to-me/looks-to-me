import { cloneElement } from 'react';

import * as styles from './button.css';
import { mergeProps } from '../../../app/_helpers/merge-props';

import type { ReactElement , FC } from 'react';

export type ButtonIconProps = {
  children: ReactElement;
};

export const ButtonIcon: FC<ButtonIconProps> = ({
  children,
}) => {
  return cloneElement(children, mergeProps(children.props, { className: styles.icon }));
};

import { cloneElement } from 'react';

import * as styles from './button.css';
import { mergeProps } from '../../_helpers/mergeProps';

import type { ReactElement , FC } from 'react';

export type ButtonIconProps = {
  children: ReactElement;
};

export const ButtonIcon: FC<ButtonIconProps> = ({
  children,
}) => {
  return cloneElement(children, mergeProps(children.props, { className: styles.icon }));
};

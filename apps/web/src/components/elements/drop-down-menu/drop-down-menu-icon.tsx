import { cloneElement } from 'react';

import * as styles from './drop-down-menu.css';
import { mergeProps } from '../../../helpers/merge-props';

import type { ReactElement , FC } from 'react';

export type DropDownMenuIconProps = {
  children: ReactElement;
};

export const DropDownMenuIcon: FC<DropDownMenuIconProps> = ({
  children,
}) => {
  return cloneElement(children, mergeProps(children.props, { className: styles.icon }));
};

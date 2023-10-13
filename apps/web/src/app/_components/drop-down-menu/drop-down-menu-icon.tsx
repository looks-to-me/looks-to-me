import { cloneElement } from 'react';

import * as styles from './drop-down-menu.css';
import { mergeProps } from '../../_helpers/mergeProps';

import type { ReactElement , FC } from 'react';

export type DropDownMenuIconProps = {
  children: ReactElement;
};

export const DropDownMenuIcon: FC<DropDownMenuIconProps> = ({
  children,
}) => {
  return cloneElement(children, mergeProps(children.props, { className: styles.icon }));
};

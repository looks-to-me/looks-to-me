import {
  description,
  wrapper,
  title,
} from './styles';

import type { ComponentPropsWithoutRef, FC } from 'react';

export type LgtmTextProps = ComponentPropsWithoutRef<'div'> & {
  word: string;
};

export const LgtmText: FC<LgtmTextProps> = ({ word, className }) => {
  if(!word) return null;
  return (
  /**
     * NOTE: The reason for passing both className and style is as follows
     * className: Because we want to use media queries.
     * style: Because ImageResponse only supports style.
     */
    <div style={wrapper} className={className}>
      <div style={title}>L{word.at(0) ?? ''}TM</div>
      <div style={description}>Looks {word} To Me</div>
    </div>
  );
};

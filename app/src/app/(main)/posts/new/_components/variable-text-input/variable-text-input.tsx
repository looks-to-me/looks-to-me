'use client';
import clsx from 'clsx';
import { useRef } from 'react';

import * as styles from './variable-text-input.css';

import type { ChangeEvent, FC } from 'react';

export type VariableTextInputProps = Omit<JSX.IntrinsicElements['input'], 'type'> & {
  className?: string;
};

export const VariableTextInput: FC<VariableTextInputProps> = ({
  className,
  ...props
}) => {
  const dummy = useRef<HTMLDivElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(dummy.current === null) return;
    dummy.current.innerText = e.target.value;
  };

  return (
    <div className={styles.inputTextItem}>
      <div className={styles.inputTextDummy} data-placeholder="Good" ref={dummy}></div>
      <input {...props} className={clsx(className, styles.inputText)} type='text' onChange={onChange} />
    </div>
  );
};

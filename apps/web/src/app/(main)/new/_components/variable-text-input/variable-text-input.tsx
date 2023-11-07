'use client';

import { clsx } from 'clsx';
import { useCallback, useRef } from 'react';

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

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if(dummy.current === null) return;
    dummy.current.textContent = event.target.value;
  }, []);

  return (
    <div className={styles.wrapper}>
      <div ref={dummy} className={styles.dummy} data-placeholder={props.placeholder} />
      <input {...props} className={clsx(className, styles.input)} type="text" onChange={onChange} />
    </div>
  );
};

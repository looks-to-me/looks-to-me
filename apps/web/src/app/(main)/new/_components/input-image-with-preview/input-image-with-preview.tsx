'use client';

import { clsx } from 'clsx';
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

import * as styles from './input-image-with-preview.css';
import { theme } from '../../../../../themes';
import { overlayTitleStyle as overlayTitleStyle, overlayDescptionStyle as overlayDescptionStyle } from '../../../images/overlays/[word]/styles';

import type { InputHTMLAttributes, ChangeEventHandler, DragEventHandler, MouseEventHandler, ForwardRefRenderFunction } from 'react';

const ACCEPTABLE_TYPES = 'image/png, image/jpeg, image/jpg, image/gif';
const buttonTheme = theme.color.token.button.normal;

export type InputImageWithPreviewHandle = {
  reset(): void;
};

export type InputImageWithPreviewProps = {
  className?: string | undefined;
  name: InputHTMLAttributes<HTMLInputElement>['name'];
  word: string;
};

const InputImageWithPreviewRender: ForwardRefRenderFunction<InputImageWithPreviewHandle, InputImageWithPreviewProps> = ({
  className,
  name,
  word,
}, ref) => {
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<{ file: File; width: number; height: number }>();
  const [isDropActive, setIsDropActive] = useState(false);

  useImperativeHandle(ref, () => ({
    reset: () => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setImage(undefined);
      if (inputImageRef.current) inputImageRef.current.value = '';
    },
  }));

  const setFile = useCallback((file: File) => {
    const element = new Image();
    element.addEventListener('load', () => {
      setImage({
        file,
        width: element.naturalWidth,
        height: element.naturalHeight,
      });
    });
    element.src = URL.createObjectURL(file);
  }, []);

  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(() => {
    if(!inputImageRef.current) return;
    inputImageRef.current.click();
  }, []);

  const handleFileInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    if (!file) return;

    setFile(file);
  }, [setFile]);

  const handleDrop = useCallback<DragEventHandler<HTMLDivElement>>(event => {
    event.preventDefault();
    setIsDropActive(false);

    if(!inputImageRef.current) return;
    if (!event.dataTransfer.files) return;

    const file = event.dataTransfer.files[0];
    if (!file) return;

    inputImageRef.current.files = event.dataTransfer.files;
    event.dataTransfer.clearData();
    setFile(file);
  }, [setFile]);

  const handleDragEnter = useCallback<DragEventHandler<HTMLDivElement>>(event => {
    event.preventDefault();
    setIsDropActive(true);
  }, []);

  const handleDragLeave = useCallback<DragEventHandler<HTMLDivElement>>(event => {
    event.preventDefault();

    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDropActive(false);
    }
  }, []);

  const handleDragOver = useCallback<DragEventHandler<HTMLDivElement>>(event => {
    event.preventDefault();
  }, []);

  const lgtmFirstLetter = `L${word.at(0)?.toUpperCase() ?? ''}TM`;
  const lgtmFullText = `Looks ${
    word.at(0)?.toUpperCase() ?? ''}${word.slice(1).toLowerCase() ?? ''} To Me`;
  return (
    <div className={clsx(className, styles.wrapper)}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={styles.dropZone}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        style={{
          borderColor: isDropActive ? buttonTheme.border : buttonTheme.hover.border,
          backgroundColor: isDropActive ? buttonTheme.background : buttonTheme.hover.background,
        }}
      >
        {image ? (
          <div className={styles.imageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.image}
              src={URL.createObjectURL(image.file)}
              alt="Preview"
            />
            <div className={styles.overlayTextWrapper}>
              <div style={{ ...overlayTitleStyle, fontSize:  '7em' }}>{lgtmFirstLetter}</div>
              <div style={{ ...overlayDescptionStyle, fontSize:  '1.8em' }}>{lgtmFullText}</div>
            </div>
          </div>
        ) : (
          <>
            <p>Drop an Image Here</p>
            <p>or click to upload</p>
          </>
        )}
        <input
          ref={inputImageRef}
          type="file"
          name={name}
          accept={ACCEPTABLE_TYPES}
          onChange={handleFileInputChange}
          hidden
        />
        <input
          type="hidden"
          name={`${name}-width`}
          value={image?.width ?? 0}
        />
        <input
          type="hidden"
          name={`${name}-height`}
          value={image?.height ?? 0}
        />
      </div>
    </div>
  );
};

export const InputImageWithPreview = forwardRef(InputImageWithPreviewRender);

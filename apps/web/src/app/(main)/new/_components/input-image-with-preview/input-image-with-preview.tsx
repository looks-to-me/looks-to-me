'use client';

import { clsx } from 'clsx';
import { useCallback, useRef, useState } from 'react';

import * as styles from './input-image-with-preview.css';
import { theme } from '../../../../_theme';

import type { FC, InputHTMLAttributes, ChangeEventHandler, DragEventHandler, MouseEventHandler } from 'react';

const ACCEPTABLE_TYPES = 'image/png, image/jpeg, image/jpg, image/gif';
const buttonTheme = theme.color.token.button.normal;

export type InputImageWithPreviewProps = {
  className?: string | undefined;
  name: InputHTMLAttributes<HTMLInputElement>['name'];
};

export const InputImageWithPreview: FC<InputImageWithPreviewProps> = ({
  className,
  name,
}) => {
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<{ file: File; width: number; height: number }>();
  const [isDropActive, setIsDropActive] = useState(false);

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
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            className={styles.image}
            src={URL.createObjectURL(image.file)}
            alt="Preview"
          />
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

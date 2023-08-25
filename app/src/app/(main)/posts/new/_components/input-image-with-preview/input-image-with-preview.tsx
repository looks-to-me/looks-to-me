'use client';
import clsx from 'clsx';
import { useRef, useState } from 'react';

import * as styles from './input-image-with-preview.css';
import { theme } from '../../../../../_theme';

import type { DragEvent, FC, InputHTMLAttributes } from 'react';

const ACCEPTABLE_TYPES = 'image/png, image/jpeg, image/jpg, image/gif';
const buttonTheme = theme.color.token.button.normal;

export type InputImageWithPreviewProps = {
  className?: string | undefined;
  name: InputHTMLAttributes<HTMLInputElement>['name'];
};

const imageUrl = (image: File) => {
  return window.URL.createObjectURL(image);
};

export const InputImageWithPreview: FC<InputImageWithPreviewProps> = ({
  className,
  name,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File>();

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];
    if (fileObject === undefined) return;

    setImage(fileObject);
  };

  const [isDropActive, setIsDropActive] = useState(false);
  const onDragEnger = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDropActive(true);
  };
  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!(e.currentTarget as Node).contains(e.relatedTarget as Node)) {
      setIsDropActive(false);
    }
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    console.log(e);
    e.preventDefault();
    setIsDropActive(false);
    if (e.dataTransfer.files !== null && e.dataTransfer.files.length > 0) {
      if(inputRef.current === null) return;
      inputRef.current.files = e.dataTransfer.files;
      e.dataTransfer.clearData();
      setImage(e.dataTransfer.files[0]);
    }
  };

  const clickInput = () => {
    if(inputRef.current === null) return;
    inputRef.current.click();
  }

  return (
    <div className={clsx(className, styles.wrapper)}>
      <div
        onDragEnter={onDragEnger}
        onDragLeave={onDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className={clsx(styles.dropZone)}
        style={{
          borderColor: isDropActive ? buttonTheme.border : buttonTheme.hover.border,
          backgroundColor: isDropActive ? buttonTheme.background : buttonTheme.hover.background,
        }}
        onClick={clickInput}
      >
        {
          image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={imageUrl(image)} alt="Preview"/>
          ) : (
            <>
              <p>Drop an Image Here</p>
              <p>or click to upload</p>
            </>
          )
        }
        <input type="file" hidden name={name} accept={ACCEPTABLE_TYPES} onChange={onFileInputChange} ref={inputRef} />
      </div>
    </div>
  );
};

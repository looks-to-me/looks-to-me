'use client';
import clsx from 'clsx';
import { useState } from 'react';

import * as styles from './input-image-with-preview.css';

import type { FC, InputHTMLAttributes } from 'react';

const ACCEPTABLE_TYPES = 'image/png, image/jpeg, image/jpg, image/gif';

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
  const [image, setImage] = useState<File>();

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];
    if (fileObject === undefined) return;

    setImage(fileObject);
  };

  return (
    <div className={clsx(className, styles.wrapper)}>
      <input type="file" name={name} accept={ACCEPTABLE_TYPES} onChange={onFileInputChange} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {image && <img src={imageUrl(image)} alt="Preview"/>}
    </div>
  );
};

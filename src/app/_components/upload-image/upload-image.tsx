'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useState, type FC } from 'react';

import * as styles from './upload-image.css';

export type UploadImageProps = {
  className?: string | undefined;
};

const acceptableTypes = 'image/png, image/jpeg, image/jpg, image/gif';

const imageUrl = (image: File) => {
  if (image === undefined) return '';
  return window.URL.createObjectURL(image);
};

export const UploadImage: FC<UploadImageProps> = ({
  className,
}) => {
  const [image, setImage] = useState<File>();

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];
    if(fileObject === undefined) return;

    setImage(fileObject);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (image === undefined) return;
    console.log(image)
  };

  return (
    <div className={clsx(className, styles.wrapper)}>
      {
        image && <Image src={imageUrl(image)} alt="Preview" width='320' height='300' />
      }
      <form onSubmit={onSubmit} >
        <input type="file" id='image' accept={acceptableTypes} onChange={onFileInputChange} />
        <input type="submit"/>
      </form>

    </div>
  );
};

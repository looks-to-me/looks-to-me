import clsx from 'clsx';
import { type FC } from 'react';

import * as styles from './post-create-form.css';
import { InputImageWithPreview } from '../input-image-with-preview';

export type PostCreateFormProps = {
  className?: string | undefined;
};

export const PostCreateForm: FC<PostCreateFormProps> = ({
  className,
}) => {

  const submitImage = async (formData: FormData) => {
    'use server';
    // バックエンドに画像を送る
    console.log(formData.get('image'));
  };

  return (
    <div className={clsx(className, styles.wrapper)}>
      <form action={submitImage} >
        <InputImageWithPreview name='image' />
        <input type="submit"/>
      </form>

    </div>
  );
};

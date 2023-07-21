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

  // eslint-disable-next-line @typescript-eslint/require-await,
  const submitImage = async (formData: FormData): Promise<void> => {
    'use server';
    // バックエンドに画像を送る
    console.log(formData.get('image'));
    return;
  };

  return (
    <div className={clsx(className, styles.wrapper)}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form action={submitImage} >
        <InputImageWithPreview name='image' />
        <input type="submit"/>
      </form>

    </div>
  );
};

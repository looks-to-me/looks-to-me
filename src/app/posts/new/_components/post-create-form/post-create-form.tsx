import { createId } from '@paralleldrive/cuid2';
import clsx from 'clsx';

import * as styles from './post-create-form.css';
import { db } from '../../../../_libs/db';
import { images } from '../../../../_libs/db/schema/tables/images';
import { uploadImage } from '../../../../_libs/storage';
import { InputImageWithPreview } from '../input-image-with-preview';

import type { FC } from 'react';

class ImageUploadError extends Error {
  public override readonly name = 'ImageUploadError';

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export type PostCreateFormProps = {
  className?: string | undefined;
};

export const PostCreateForm: FC<PostCreateFormProps> = ({
  className,
}) => {

  const submitImage = async (formData: FormData): Promise<void> => {
    'use server';

    const image = formData.get('image');
    if (image === null || typeof image === 'string') {
      throw new ImageUploadError('Image is null or string');
    }

    // TODO 画像を加工する
    const edittedImage = image;

    // 画像をR2にアップロードする
    const uploadResult = await uploadImage({ image: edittedImage });

    const insertResult = await db().insert(images).values({
      id: createId(),
      key: uploadResult.key,
      userId: 'TODO', // TODO Fkeyなので今は動かない
    }).run();

    // TODO 終わったら画面遷移？
    console.log(insertResult);
    return;
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

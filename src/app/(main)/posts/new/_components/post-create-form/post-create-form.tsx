import { createId } from '@paralleldrive/cuid2';
import clsx from 'clsx';

import * as styles from './post-create-form.css';
import { getAuthUser } from '../../../../../_libs/auth/server/get-auth-user';
import { db } from '../../../../../_libs/db';
import { images } from '../../../../../_libs/db/schema/tables/images';
import { posts } from '../../../../../_libs/db/schema/tables/posts';
import { uploadImage } from '../../../../../_libs/storage';
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

  const submitPost = async (formData: FormData): Promise<void> => {
    'use server';

    const image = formData.get('image');
    if (image === null || typeof image === 'string') {
      throw new ImageUploadError('Image is null or string');
    }

    const word = formData.get('word') || 'Good';
    if(typeof word !== 'string') {
      throw new ImageUploadError('Word is not string');
    }

    // 画像をR2にアップロードする
    const uploadResult = await uploadImage({ image });

    const authUser = await getAuthUser();
    if (authUser === undefined) {
      throw new ImageUploadError('Login Required');
    }

    const postId = createId();

    // DBに画像と投稿を登録する
    await db().transaction(async (tx) => {
      await tx.insert(images).values({
        id: uploadResult.key,
        userId: authUser.id,
        uploadedAt: new Date(),
      }).run();
      await tx.insert(posts).values({
        id: postId,
        userId: authUser.id,
        imageId: uploadResult.key,
        word,
        postedAt: new Date(),
      }).run();
    });

    // TODO 終わったら画面遷移？
    console.log(postId);
    return;
  };

  return (
    <div className={clsx(className, styles.wrapper)}>
      <form action={submitPost} >
        <InputImageWithPreview name='image' />
        <input name='word' type="text" />
        <input type="submit" />
      </form>
    </div>
  );
};

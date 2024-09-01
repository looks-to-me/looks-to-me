'use server';

import { createId } from '@paralleldrive/cuid2';
import { revalidatePath } from 'next/cache';
import { coerce, instance, minValue, number, object, parse } from 'valibot';

import { getLoginUser } from '../../../../../../queries/user/get-login-user';
import { deleteImage, saveImage } from '../../../../../../repositories/image-repository';
import { deletePost, savePost } from '../../../../../../repositories/post-repository';
import { postWordSchema } from '../../../../../../schemas/post-word-schema';
import { publicEnv } from '../../../../../_libs/env';
import { storage } from '../../../../../_libs/storage';

import type { Route } from 'next';

const inputSchema = object({
  image: instance(Blob),
  imageWidth: coerce(number([minValue(1)]), Number),
  imageHeight: coerce(number([minValue(1)]), Number),
  word: postWordSchema,
});

export type SubmitPostResult = {
  type: 'success';
  message: string;
  redirectUrl: Route<`/@${string}/posts/${string}`>;
} | {
  type: 'error';
  reason: 'unauthorized' | 'unknown';
  message: string;
};

export const submitPost = async (formData: FormData): Promise<SubmitPostResult> => {
  try {
    const user = await getLoginUser();
    if (!user) return { type: 'error', reason: 'unauthorized', message: 'Login required!' };

    const input = parse(inputSchema, {
      image: formData.get('image'),
      imageWidth: formData.get('image-width'),
      imageHeight: formData.get('image-height'),
      word: formData.get('word'),
    });

    const postId = createId();
    const imageId = createId();
    const imageKey = `users/${user.id}/images/${imageId}`;

    try {
      // TODO: Need to make sure that the CloudflareImageResizing limit is not exceeded.
      // @see: https://developers.cloudflare.com/images/image-resizing/format-limitations/#format-limitations
      await storage().put(imageKey, await input.image.arrayBuffer());

      const image = await saveImage({
        id: imageId,
        userId: user.id,
        width: input.imageWidth,
        height: input.imageHeight,
      });

      const post = await savePost({
        id: postId,
        userId: user.id,
        imageId: image.id,
        word: input.word,
      });

      // TODO: If the request fails, make it retry.
      const results = await Promise.all([
        fetch(`${publicEnv().NEXT_PUBLIC_APP_ORIGIN}/images/posts/${post.id}`),
        fetch(`${publicEnv().NEXT_PUBLIC_APP_ORIGIN}/images/posts/${post.id}`, { headers: { accept: 'image/webp' } }),
      ]);

      for (const result of results) {
        if (!result.ok) throw new Error(await result.text());
      }

      revalidatePath('/');
      revalidatePath(`/@${user.profile.name}`);

      return { type: 'success', message: 'Post created!', redirectUrl: `/@${user.profile.name}/posts/${post.id}` };
    } catch (error) {
      console.error(error);

      await deleteImage(imageId);
      await deletePost(postId);
      await storage().delete(imageKey);
      return { type: 'error', reason: 'unknown', message: 'Post creation failed!' };
    }
  } catch (error) {
    console.error(error);
    return { type: 'error', reason: 'unknown', message: 'Post creation failed!' };
  }
};

import { createId } from '@paralleldrive/cuid2';

import { env } from '../env';

class UploadFileError extends Error {
  public override readonly name = 'UploadFileError';
  public static readonly message = 'Failed to upload file';

  constructor(options?: ErrorOptions) {
    super(UploadFileError.message, options);
  }
}

export const uploadImage: UploadImage = async ({ image }) => {
  // upload image to R2 and returns the image key

  const client = env().BUCKET;

  const buf = await image.arrayBuffer();
  const result = await client.put(createId(), buf);

  if (result === null) {
    throw new UploadFileError('Failed to upload image: result is null');
  }

  return {
    key: result.key,
  };
};

export type UploadImageArgs = {
  image: File;
};
export type UploadImageResult = {
  key: string;
};

export type UploadImage = (args: UploadImageArgs) => Promise<UploadImageResult>;

import { createId } from '@paralleldrive/cuid2';

import { env } from '../env';

class StorageError extends Error {
  public override readonly name = 'StorageError';

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

const fileToBase64 = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  let binaryString = '';
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binaryString += String.fromCharCode(bytes[i]!);
  }
  return btoa(binaryString);
};

export const uploadImage: UploadImage = async ({ image }) => {
  const client = env().BUCKET;

  // upload image to R2 and returns the image key
  // TODO: cf-bindings-proxyのバグでarrayBufferが使えないので，一旦base64で送る
  // const buf = await image.arrayBuffer();
  // await client.put(createId(), buf);

  const base64Image = await fileToBase64(image);
  const result = await client.put(createId(), base64Image);

  if (result === null) {
    throw new StorageError('Failed to upload image: result is null');
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

import { createId } from '@paralleldrive/cuid2';

class UploadFileError extends Error {
  public override readonly name = 'UploadFileError';
  public static readonly message = 'Failed to upload file';

  constructor(options?: ErrorOptions) {
    super(UploadFileError.message, options);
  }
}

export const uploadFile: UploadFile = (client) => async (file) => {
  // upload image to R2 and returns the image key
  try {
    const buf = await file.arrayBuffer();
    const result = await client.put(createId(), buf);
    if (result) return result;
  } catch (error) {
    throw new UploadFileError({ cause: error });
  }

  throw new UploadFileError();
};

export type UploadFile = (client: R2Bucket) => (file: File) => Promise<R2Object>;

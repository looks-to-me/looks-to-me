// eslint-disable-next-line @typescript-eslint/require-await
export const uploadImage: UploadImage = async ({ image }) => {
  // TODO: upload image to R2 and returns the image key
  console.log(image);
  return {
    key: `image-key-${new Date().getTime()}`,
  };
};

export type UploadImageArgs = {
  image: File;
};
export type UploadImageResult = {
  key: string;
};

export type UploadImage = (args: UploadImageArgs) => Promise<UploadImageResult>;

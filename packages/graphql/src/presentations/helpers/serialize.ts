export const serialize = (value: unknown): string => {
  return Buffer.from(JSON.stringify(value)).toString('base64');
};

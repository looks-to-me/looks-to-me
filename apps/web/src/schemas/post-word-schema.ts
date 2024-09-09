import * as v from 'valibot';

export const postWordSchema = v.pipe(
  v.string(),
  v.regex(/^[A-Za-z]+$/, 'Must be a alphabetic.'),
  v.maxLength(16, 'Must be less than 16 characters.'),
  v.transform((input) => `${input[0]?.toUpperCase()}${input.slice(1).toLowerCase()}`),
);

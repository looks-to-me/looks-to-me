import { maxLength, regex, string, transform } from 'valibot';

export const postWordSchema = transform(
  string([
    regex(/^[A-Za-z]+$/, 'Must be a alphabetic.'),
    maxLength(16, 'Must be less than 16 characters.'),
  ]),
  input => `${input[0]?.toUpperCase()}${input.slice(1).toLowerCase()}`,
);

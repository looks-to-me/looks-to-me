import { env } from '../env';

// TODO: Make it mock when it runs in Storybook.
export const storage = () => env().BUCKET;

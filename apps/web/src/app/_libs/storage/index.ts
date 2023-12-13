import { privateEnv } from '../env';

// TODO: Make it mock when it runs in Storybook.
export const storage = () => privateEnv().BUCKET;

import { publicEnv } from './src/app/_libs/env';

import type { ImageLoader } from 'next/image';

const normalizeSource = (source: string): string => source.startsWith('/') ? source.slice(1) : source;

const loader: ImageLoader = ({ src, width }) => {
  return `${publicEnv().NEXT_PUBLIC_CDN_ORIGIN}/${normalizeSource(src)}?width=${width}`;
};

export default loader;

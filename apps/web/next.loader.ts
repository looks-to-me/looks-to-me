import { env } from './src/app/_libs/env';

import type { ImageLoader } from 'next/image';

const normalizeSrc = (src: string): string => src.startsWith('/') ? src.slice(1) : src;

const loader: ImageLoader = ({ src, width }) => {
  return `${env().NEXT_PUBLIC_CDN_ORIGIN}/${normalizeSrc(src)}?width=${width}`;
};

export default loader;

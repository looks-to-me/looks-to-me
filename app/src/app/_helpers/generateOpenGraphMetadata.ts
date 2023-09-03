import type { Metadata } from 'next';
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

/**
 * Generates Open Graph and Twitter metadata for the given arguments.
 * If "args.images" is not provided, a default OG image will be used.
 */
export const generateOpenGraphMetadata
= (args: { title: string | {
  absolute: string;
}; images?: OpenGraph['images']; }):Required<Pick<Metadata,
  'openGraph' | 'twitter'
>> => {
  const title = typeof args.title === 'string' ? `${args.title} | LooksToMe` : args.title.absolute;
  return {
    openGraph: {
      type: 'website',
      siteName: 'LooksToMe',
      title,
      images: args.images ?? {
        url: '/looks-to-me-with-text-black.png',
        width: 1200,
        height: 630,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title,
    },
  };
};

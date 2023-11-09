import type { Metadata } from 'next';

const getTitle = (metadata: Metadata): string => {
  if (!metadata.title) {
    return 'LooksToMe';
  }

  if (typeof metadata.title === 'string') {
    return `${metadata.title} | LooksToMe`;
  }

  if ('absolute' in metadata.title) {
    return metadata.title.absolute;
  }

  return 'LooksToMe';
};

export const createMetadata = (metadata: Metadata): Metadata => {
  return {
    title: 'LooksToMe',
    description: 'LooksToMeはエンジニアが良い感じの画像をシェアする場所です。ここぞというタイミングで良い感じの画像を送り付けましょう。',
    ...metadata,
    openGraph: {
      title: getTitle(metadata),
      description: 'LooksToMeはエンジニアが良い感じの画像をシェアする場所です。ここぞというタイミングで良い感じの画像を送り付けましょう。',
      type: 'website',
      siteName: 'LooksToMe',
      ...metadata.openGraph,
      images: metadata.openGraph?.images ?? {
        url: '/looks-to-me-with-text-black.png',
        width: 1200,
        height: 630,
      },
    },
    twitter: {
      card: 'summary_large_image',
      ...metadata.twitter,
    },
  };
};

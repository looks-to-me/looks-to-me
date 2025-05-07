import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';

import type { NextConfig } from 'next';

void initOpenNextCloudflareForDev();

const withVanillaExtract = createVanillaExtractPlugin();

// eslint-disable-next-line unicorn/no-anonymous-default-export
export default (phase: string): NextConfig => {
  const nextConfig: NextConfig = {
    transpilePackages: [
      '@looks-to-me/*',
    ],
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      disableStaticImages: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
        },
      ],
    },
    experimental: {
      typedRoutes: true,
      serverActions: {
        bodySizeLimit: '5mb',
      },
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    rewrites: async () => [
      {
        source: '/storybook',
        destination: '/storybook/index.html',
      },
    ],
    // eslint-disable-next-line @typescript-eslint/require-await
    redirects: async () => [
      {
        source: '/%40:username/',
        destination: '/@:username/',
        permanent: true,
      },
    ],
  };

  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    nextConfig.images = {
      ...nextConfig.images,
      loader: 'custom',
      loaderFile: './next.loader.ts',
    };
  }

  return withVanillaExtract(nextConfig);
};

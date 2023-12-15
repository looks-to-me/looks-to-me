import { imageCache } from '@looks-to-me/package-image-cache';
import { ImageResponse } from 'next/og';
import { maxLength, parse, regex, string, transform } from 'valibot';

import { overlayDescptionStyle, overlayTextWrapper, overlayTitleStyle } from './styles';
import { loadGoogleFont } from '../../../../../helpers/load-google-font';
import { privateEnv } from '../../../../_libs/env';

import type { ImageCacheParameters } from '@looks-to-me/package-image-cache';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const wordSchema = transform(
  string([
    regex(/^[A-Za-z]+$/, 'Must be a alphabetic.'),
    maxLength(16, 'Must be less than 16 characters.'),
  ]),
  input => `${input[0]?.toUpperCase()}${input.slice(1).toLowerCase()}`,
);

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

type Context = {
  params: {
    word: string;
  };
};

export const GET = async (request: NextRequest, context: Context) => {
  const parameters: ImageCacheParameters = {
    request,
    format: 'png',
    bucket: privateEnv().BUCKET,
  };

  return imageCache(parameters, async () => {
    const word = parse(wordSchema, context.params.word);
    return new ImageResponse(
      (
        <div style={overlayTextWrapper}>
          <div style={overlayTitleStyle}>
            L{word.at(0)}TM
          </div>
          <div style={overlayDescptionStyle}>
            Looks {word} To Me
          </div>
        </div>
      ),
      {
        width: 600,
        height: 300,
        fonts: [
          {
            name: 'Inter',
            data: await loadGoogleFont({ family: 'Inter', weight: 400, text: alphabet }),
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: await loadGoogleFont({ family: 'Inter', weight: 700, text: alphabet }),
            weight: 700,
            style: 'normal',
          },
        ],
      },
    ) as unknown as Response;
  });
};

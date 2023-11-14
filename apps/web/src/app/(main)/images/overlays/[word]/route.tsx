import { imageCache } from '@looks-to-me/package-image-cache';
import { ImageResponse } from 'next/og';
import { getOutput, maxLength, parse, regex, string } from 'valibot';

import { loadGoogleFont } from '../../../../_helpers/load-google-font';
import { privateEnv } from '../../../../_libs/env';

import type { ImageCacheParameters } from '@looks-to-me/package-image-cache';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const wordSchema = string([
  regex(/^[A-Za-z]+$/, 'Must be a alphabetic.'),
  maxLength(16, 'Must be less than 16 characters.'),
  input => getOutput(`${input[0]?.toUpperCase()}${input.slice(1).toLowerCase()}`),
]);

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const textStyle = {
  display: 'flex',
  color: '#fff',
  textShadow:
    `1px 1px 0px #000, -1px -1px 0px #000,
    -1px 1px 0px #000,  1px -1px 0px #000,
    1px 0px 0px #000, -1px  0px 0px #000,
    0px 1px 0px #000,  0px -1px 0px #000`,
};

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <div style={{ ...textStyle, fontSize: 120, fontWeight: 700, letterSpacing: '.1em' }}>
            L{word.at(0)}TM
          </div>
          <div style={{ ...textStyle, fontSize: 30, letterSpacing: '.05em' }}>
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

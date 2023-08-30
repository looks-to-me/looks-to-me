import { ImageResponse } from 'next/server';
import { z } from 'zod';

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export const contentType = 'image/png';

const wordSchema = z
  .string()
  .regex(/^[a-zA-Z]+$/, { message: 'Must be a alphabetic.' })
  .max(32, { message: 'Must be less than 32 characters.' })
  .transform((word) => `${word[0]?.toUpperCase()}${word.slice(1).toLowerCase()}`);

const textStyle = {
  display: 'flex',
  color: '#fff',
  textShadow:
    `1px 1px 0px #000, -1px -1px 0px #000,
    -1px 1px 0px #000,  1px -1px 0px #000,
    1px 0px 0px #000, -1px  0px 0px #000,
    0px 1px 0px #000,  0px -1px 0px #000`,
};

export const GET = (_: NextRequest, { params }: { params: { word: string } }) => {
  const word = wordSchema.parse(params.word);

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
        <div style={{ ...textStyle, fontSize: 200 }}>
          L{word.at(0)}TM
        </div>
        <div style={{ ...textStyle, fontSize: 50 }}>
          Looks {word} To Me
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
};

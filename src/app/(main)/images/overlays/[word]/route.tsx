import { ImageResponse } from 'next/server';
import { z } from 'zod';

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export const contentType = 'image/png';

const colorSchema = z.union([z.literal('black'), z.literal('white')]).default('black');
const wordSchema = z
  .string()
  .regex(/^[a-zA-Z]+$/, { message: 'Must be a alphabetic.' })
  .max(32, { message: 'Must be less than 32 characters.' })
  .transform((word) => `${word[0]?.toUpperCase()}${word.slice(1).toLowerCase()}`);

export const GET = (request: NextRequest, { params }: { params: { word: string } }) => {
  const word = wordSchema.safeParse(params.word);
  if (!word.success) {
    return new Response(word.error.message, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const color = colorSchema.safeParse(searchParams.get('color') ?? undefined);
  if (!color.success) {
    return new Response('color must be white or black', { status: 400 });
  }

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
        <div style={{ display: 'flex', fontSize: 200, color: color.data }}>L{word.data.at(0)}TM</div>
        <div style={{ display: 'flex', fontSize: 50, color: color.data }}>Looks {word.data} To Me</div>
      </div>
    ),
  );
};

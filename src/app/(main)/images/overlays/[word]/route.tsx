import { ImageResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export const contentType = 'image/png';

const isTooLong = (word: string) => word.length > 32;

const isAlphabetic = (word: string) => /^[a-zA-Z]+$/.test(word);

const normalize = (word: string) => {
  return `${word[0]?.toUpperCase()}${word.slice(1).toLowerCase()}`;
};

const getColorQuery = (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const color = searchParams.get('color');
  if (!color) {
    // default color
    return 'black';
  }
  if (color === 'white' || color === 'black') {
    return color;
  }
  return null;
};

export const GET = (
  request: NextRequest,
  { params }: { params: { word: string } },
) => {
  if (isTooLong(params.word)) {
    return new Response('word must be less than 32 characters', {
      status: 400,
    });
  }
  if (!isAlphabetic(params.word)) {
    return new Response('word must be alphabetic', { status: 400 });
  }
  const word = normalize(params.word);

  const color = getColorQuery(request);
  if (!color) {
    return new Response('color must be white or black', { status: 400 });
  }

  return new ImageResponse((
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
      <div style={{ display: 'flex', fontSize: 200, color }}>
        L{word.at(0)}TM
      </div>
      <div style={{ display: 'flex', fontSize: 50, color }}>
        Looks {word} To Me
      </div>
    </div>
  ));
};

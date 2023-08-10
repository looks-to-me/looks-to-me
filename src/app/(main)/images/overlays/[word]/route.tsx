import { ImageResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export const contentType = 'image/png';

const normalize = (word: string) => {
  return `${word[0]?.toUpperCase()}${word.slice(1).toLowerCase()}`;
};

// TODO: Font size, etc. must be adjusted.
export const GET = (
  _: NextRequest,
  { params }: { params: { word: string } },
) => {
  const word = normalize(params.word);

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
      <div style={{ display: 'flex' }}>
        L{word.at(0)}TM
      </div>
      <div style={{ display: 'flex' }}>
        Looks {word} To Me
      </div>
    </div>
  ));
};

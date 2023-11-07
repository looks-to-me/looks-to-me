export type LoadGoogleFontProps = {
  family: string;
  weight?: number;
  text?: string;
};

/**
 * Function to retrieve font data from GoogleFonts.
 * Based on the following implementation with some modifications.
 * @see: https://github.com/kvnang/workers-og/blob/d77cdf29b0abac71b150a1e191e5cdc7c762054e/packages/workers-og/src/font.ts
 */
export const loadGoogleFont = async ({
  family,
  weight,
  text,
}: LoadGoogleFontProps): Promise<ArrayBuffer> => {
  const parameters: Record<string, string> = {
    family: `${encodeURIComponent(family)}${weight ? `:wght@${weight}` : ''}`,
  };

  if (text) {
    parameters['text'] = text;
  } else {
    parameters['subset'] = 'latin';
  }

  const query = Object.keys(parameters).map(key => `${key}=${parameters[key]}`).join('&');
  const url = `https://fonts.googleapis.com/css2?${query}`;

  let cache: Cache | undefined;
  let response: Response | undefined;
  if (typeof caches !== 'undefined') {
    cache = await caches.open('font-cache');
    response = await cache.match(url);
  }

  if (!response) {
    response = await fetch(url, {
      headers: {
        // construct user agent to get TTF font
        'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    });

    response = new Response(response.body, response);
    response.headers.append('Cache-Control', 's-maxage=3600');

    await cache?.put(url, response.clone());
  }

  // Get the font URL from the CSS text
  const body = await response.text();
  const fontUrl = body.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)?.[1];

  if (!fontUrl) {
    throw new Error('Could not find font URL');
  }

  return fetch(fontUrl).then(response => response.arrayBuffer());
};

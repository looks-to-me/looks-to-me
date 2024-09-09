import * as v from 'valibot';

const schema = v.object({
  origin: v.pipe(v.string(), v.url()),
  overlay: v.pipe(v.string(), v.url()),
  width: v.pipe(v.unknown(), v.transform(Number), v.minValue(1)),
  height: v.pipe(v.unknown(), v.transform(Number), v.minValue(1)),
});

export default {
  async fetch(
    request: Request,
    env: Env,
    _context: ExecutionContext,
  ): Promise<Response> {
    if (request.headers.get('authorization') !== `Bearer ${env.INTERNAL_API_TOKEN}`) {
      return new Response('Unauthorized', { status: 401 });
    }

    const url = new URL(request.url);
    const input = v.parse(schema, {
      origin: url.searchParams.get('origin'),
      overlay: url.searchParams.get('overlay'),
      width: url.searchParams.get('width'),
      height: url.searchParams.get('height'),
    });

    const accept = request.headers.get('accept');
    const format = accept?.includes('image/webp') ? 'webp' : undefined;

    const response = await fetch(input.origin, {
      headers: {
        authorization: `Bearer ${env.INTERNAL_API_TOKEN}`,
      },
      cf: {
        image: {
          ...(format ? { format } : {}),
          'width': input.width,
          'height': input.height,
          'fit': 'contain',
          'origin-auth': 'share-publicly',
          'draw': [
            {
              url: input.overlay,
              fit: 'contain',
              width: input.width,
              height: input.height,
            },
          ],
        },
      },
    });

    const warning = response.headers.get('warning');
    if (warning) {
      return new Response(warning, { status: 400 });
    }

    return response;
  },
};

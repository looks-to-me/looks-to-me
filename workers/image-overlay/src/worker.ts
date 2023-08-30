import { z } from 'zod';

const schema = z.object({
  origin: z.string().url(),
  overlay: z.string().url(),
  width: z.coerce.number(),
  height: z.coerce.number(),
});

export default {
  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    if (request.headers.get('authorization') !== `Bearer ${env.INTERNAL_API_TOKEN}`) {
      return new Response('Unauthorized', { status: 401 });
    }

    const url = new URL(request.url);
    const input = schema.parse({
      origin: url.searchParams.get('origin'),
      overlay: url.searchParams.get('overlay'),
      width: url.searchParams.get('width'),
      height: url.searchParams.get('height'),
    });

    return fetch(input.origin, {
      headers: {
        authorization: `Bearer ${env.INTERNAL_API_TOKEN}`,
      },
      cf: {
        image: {
          width: input.width,
          height: input.height,
          'origin-auth': 'share-publicly',
          draw: [
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
  },
};

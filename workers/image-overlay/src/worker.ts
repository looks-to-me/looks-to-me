import { GIF } from './image-size/gif';
import { JPEG } from './image-size/jpeg';
import { PNG } from './image-size/png';

export const getImageSize = (buffer: Uint8Array) => {
  if (PNG.validate(buffer)) {
    return PNG.calculate(buffer);
  }

  if (JPEG.validate(buffer)) {
    return JPEG.calculate(buffer);
  }

  if (GIF.validate(buffer)) {
    return GIF.calculate(buffer);
  }

  throw Error('not supported format');
};

export default {
  async fetch(
    request: Request,
    _env: Env,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);
    const origin = url.searchParams.get('origin');
    const overlay = url.searchParams.get('overlay');

    if (!origin || !overlay) {
      return new Response('Invalid Request', { status: 400 });
    }

    const response = await fetch(origin);
    const buffer = await response.arrayBuffer();
    const size = getImageSize(new Uint8Array(buffer));

    return fetch(origin, {
      cf: {
        image: {
          draw: [
            {
              url: overlay,
              fit: 'contain',
              width: size.width,
              height: size.height,
            },
          ],
        },
      },
    });
  },
};

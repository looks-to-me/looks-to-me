export const runtime = 'edge';

export const GET = async () => {
  // TODO: Fetch a image from R2.
  const response = await fetch('https://via.placeholder.com/300x225?text=LGTM');
  const contentType = response.headers.get('Content-Type');
  if (!contentType) return Response.error();
  return new Response(await response.blob(), {
    headers: {
      'Content-Type': contentType,
    },
  });
};

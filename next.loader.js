const normalizeSrc = src => src.startsWith('/') ? src.slice(1) : src;

const loader = ({ src, width, quality }) => {
  const params = [`width=${width}`];
  if (quality) params.push(`quality=${quality}`);
  return `/cdn-cgi/image/${params.join(',')}/${normalizeSrc(src)}`;
};

export default loader;

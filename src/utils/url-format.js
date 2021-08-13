const formatPublicUrl = (url) => {
  if (url.startsWith('http')) return url;

  return url.startsWith('/') ? url : `/${url}`;
}

export {formatPublicUrl};

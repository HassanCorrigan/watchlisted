const createPosterPath = poster_path => {
  const baseImagePath = 'https://image.tmdb.org/t/p/w200';
  const posterPath = poster_path || 'images/poster-placeholder.png';

  return `${baseImagePath}/${posterPath}`;
};

const createBannerPath = banner_path => {
  const baseImagePath = 'https://image.tmdb.org/t/p/w500';
  const bannerPath = banner_path || 'images/banner-placeholder.png';

  return `${baseImagePath}/${bannerPath}`;
};

export { createPosterPath, createBannerPath };

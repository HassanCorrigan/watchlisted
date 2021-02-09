const createPosterPath = poster_path => {
  const baseAPIPath = 'https://image.tmdb.org/t/p/w200';
  const posterPath = poster_path;
  const placeholderPath = '/images/poster-placeholder.png';

  return posterPath ? `${baseAPIPath}${posterPath}` : placeholderPath;
};

const createBannerPath = banner_path => {
  const baseAPIPath = 'https://image.tmdb.org/t/p/w500';
  const bannerPath = banner_path;
  const placeholderPath = '/images/banner-placeholder.png';

  return bannerPath ? `${baseAPIPath}${bannerPath}` : placeholderPath;
};

export { createPosterPath, createBannerPath };

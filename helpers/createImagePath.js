const createPosterPath = poster_path => {
  const baseImagePath = 'https://image.tmdb.org/t/p/w200';
  const posterPath = poster_path || 'images/poster-placeholder.jpg';

  return `${baseImagePath}/${posterPath}`;
};

const createBackdropPath = backdrop_path => {
  const baseImagePath = 'https://image.tmdb.org/t/p/w500';
  const backdropPath = backdrop_path || 'images/banner-placeholder.jpg';

  return `${baseImagePath}/${backdropPath}`;
};

const createStillPath = still_path => {
  const baseImagePath = 'https://image.tmdb.org/t/p/w500';
  const stillPath = still_path || 'images/banner-placeholder.jpg';

  return `${baseImagePath}/${stillPath}`;
};

export { createPosterPath, createBackdropPath, createStillPath };

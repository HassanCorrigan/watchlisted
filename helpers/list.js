import { traktFetch, tmdbFetch } from 'helpers/apiFetch';

const getList = async (listType, token) => {
  const traktList = await traktFetch(
    `users/me/${listType}`,
    token,
    'extended=full'
  );

  return await Promise.all(
    traktList.map(async item => {
      const type = item.movie ? 'movie' : 'show';
      let title, slug, date;

      const params = item.show
        ? `tv/${item.show.ids.tmdb}`
        : `movie/${item.movie.ids.tmdb}`;

      const media = await tmdbFetch(params);

      if (item.episode) {
        title = item.episode.title;
        slug = `shows/${item.show.ids.tmdb}/season/${item.episode.season}/episode/${item.episode.number}`;
        date = item.episode.first_aired;
      } else if (item.show) {
        title = media.name;
        slug = `shows/${item.show.ids.tmdb}`;
        date = item.show.first_aired;
      } else {
        title = media.title;
        slug = `movies/${item.movie.ids.tmdb}`;
        date = item.movie.released;
      }

      return {
        title,
        poster: media,
        slug,
        type,
        date,
      };
    })
  );
};

export { getList };

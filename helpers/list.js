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
      let title, slug, released;
      const added =
        item.listed_at ||
        item.last_collected_at ||
        item.collected_at ||
        item.watched_at;

      const params = item.show
        ? `tv/${item.show.ids.tmdb}`
        : `movie/${item.movie.ids.tmdb}`;

      const media = await tmdbFetch(params);

      if (item.episode) {
        title = item.episode.title;
        slug = `shows/${item.show.ids.tmdb}/season/${item.episode.season}/episode/${item.episode.number}`;
        released = item.episode.first_aired;
      } else if (item.show) {
        title = media.name;
        slug = `shows/${item.show.ids.tmdb}`;
        released = item.show.first_aired;
      } else {
        title = media.title;
        slug = `movies/${item.movie.ids.tmdb}`;
        released = item.movie.released;
      }

      return {
        title,
        poster: media,
        slug,
        type,
        released,
        added,
      };
    })
  );
};

export { getList };

import { traktFetch, tmdbFetch } from 'helpers/api';

const createList = async (listType, token) => {
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

const sortList = (key, order = 'asc') => {
  return (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    const comparison = varA > varB ? 1 : varA < varB ? -1 : 0;

    return order === 'desc' ? comparison * -1 : comparison;
  };
};

const filterList = (list, mediaType) =>
  list.filter(item => item.type === mediaType);

export { createList, sortList, filterList };

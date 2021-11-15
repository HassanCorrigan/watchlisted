import { traktFetch, tmdbFetch } from 'helpers/api';

const createList = async listType => {
  const traktList = await traktFetch(`users/me/${listType}`, 'extended=full');

  return await Promise.all(
    traktList.map(async item => {
      const type = item.movie ? 'movie' : 'show';
      const {
        [type]: {
          ids: { tmdb: id },
        },
      } = item;
      let title, slug, released;
      const added =
        item.listed_at ||
        item.last_collected_at ||
        item.collected_at ||
        item.watched_at;

      const params = item.show ? `tv/${id}` : `movie/${id}`;

      const media = await tmdbFetch(params);

      if (item.episode) {
        title = item.episode.title;
        slug = `shows/${id}/season/${item.episode.season}/episode/${item.episode.number}`;
        released = item.episode.first_aired;
      } else if (item.show) {
        title = media.name;
        slug = `shows/${id}`;
        released = item.show.first_aired;
      } else {
        title = media.title;
        slug = `movies/${id}`;
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

const getList = async list => {
  const localData = JSON.parse(localStorage.getItem(list));
  if (localData) {
    return localData;
  }

  const showList = await createList(`${list}/shows`);
  const movieList = await createList(`${list}/movies`);
  const fullList = showList.concat(movieList);

  localStorage.setItem(list, JSON.stringify(fullList));
  return fullList;
};

const updateList = async list => {
  localStorage.removeItem(list);
  return await getList(list);
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

// Testing new lists functionality
//////////////////////////////////
const getCollection = async () => {
  const showList = await traktFetch(`users/me/collection/shows`);
  const movieList = await traktFetch(`users/me/collection/movies`);
  const traktList = showList.concat(movieList);

  return await Promise.all(
    traktList.map(async trakt => {
      const type = trakt.movie ? 'movie' : 'show';
      const {
        [type]: {
          ids: { tmdb: id },
        },
      } = trakt;
      const params = type === 'movie' ? `movie/${id}` : `tv/${id}`;
      const tmdb = await tmdbFetch(params);

      return {
        type,
        trakt,
        tmdb,
      };
    })
  );
};

const getWatched = async () => {
  const showList = await traktFetch(`users/me/watched/shows`);
  const movieList = await traktFetch(`users/me/watched/movies`);
  const traktList = showList.concat(movieList);

  return await Promise.all(
    traktList.map(async trakt => {
      const type = trakt.movie ? 'movie' : 'show';
      const {
        [type]: {
          ids: { tmdb: id },
        },
      } = trakt;
      const params = type === 'movie' ? `movie/${id}` : `tv/${id}`;
      const tmdb = await tmdbFetch(params);

      return {
        type,
        trakt,
        tmdb,
      };
    })
  );
};

const getWatchlist = async () => {
  const traktList = await traktFetch(`users/me/watchlist`);

  return await Promise.all(
    traktList.map(async trakt => {
      const { type } = trakt;
      const {
        [type]: {
          ids: { tmdb: id },
        },
      } = trakt;

      let tmdb;
      if (trakt.type === 'movie') {
        tmdb = await tmdbFetch(`movie/${id}`);
      } else if (trakt.type === 'show') {
        tmdb = await tmdbFetch(`tv/${id}`);
      } else if (trakt.type === 'season') {
        const show = await tmdbFetch(`tv/${trakt.show.ids.tmdb}`);
        const season = await tmdbFetch(
          `tv/${trakt.show.ids.tmdb}/season/${trakt.season.number}`
        );
        tmdb = { season, show };
      } else {
        const show = await tmdbFetch(`tv/${trakt.show.ids.tmdb}`);
        const episode = await tmdbFetch(
          `tv/${trakt.show.ids.tmdb}/season/${trakt.episode.season}/episode/${trakt.episode.number}`
        );
        tmdb = { episode, show };
      }

      return {
        type,
        trakt,
        tmdb,
      };
    })
  );
};

const getHistory = async () => {
  const traktList = await traktFetch(`users/me/history`);

  return await Promise.all(
    traktList.map(async trakt => {
      const { type } = trakt;
      const {
        [type]: {
          ids: { tmdb: id },
        },
      } = trakt;

      let tmdb;
      if (trakt.type === 'movie') {
        tmdb = await tmdbFetch(`movie/${id}`);
      } else if (trakt.type === 'show') {
        tmdb = await tmdbFetch(`tv/${id}`);
      } else if (trakt.type === 'season') {
        const show = await tmdbFetch(`tv/${trakt.show.ids.tmdb}`);
        const season = await tmdbFetch(
          `tv/${trakt.show.ids.tmdb}/season/${trakt.season.number}`
        );
        tmdb = { season, show };
      } else {
        const show = await tmdbFetch(`tv/${trakt.show.ids.tmdb}`);
        const episode = await tmdbFetch(
          `tv/${trakt.show.ids.tmdb}/season/${trakt.episode.season}/episode/${trakt.episode.number}`
        );
        tmdb = { episode, show };
      }

      return {
        type,
        trakt,
        tmdb,
      };
    })
  );
};
// Testing new lists functionality
//////////////////////////////////

export {
  getList,
  updateList,
  sortList,
  filterList,
  getWatchlist,
  getHistory,
  getCollection,
  getWatched,
};

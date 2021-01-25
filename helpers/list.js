import { traktFetch, tmdbFetch } from 'helpers/apiFetch';

const getList = async (listType, token) => {
  const traktList = await traktFetch(`users/me/${listType}`, token);

  return await Promise.all(
    traktList.map(async item => {
      const type = item.show ? 'show' : 'movie';
      const param = item.show ? 'tv' : 'movie';
      const id = item.show ? item.show.ids.tmdb : item.movie.ids.tmdb;

      const media = await tmdbFetch(`${param}/${id}`);

      return {
        type,
        media,
      };
    })
  );
};

export { getList };

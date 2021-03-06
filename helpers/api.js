import { getToken } from 'helpers/token';

const tmdbFetch = async (params, query) => {
  const apiURL = 'https://api.themoviedb.org/3';
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const queryString = query ? `&${query}` : '';

  try {
    const res = await fetch(
      `${apiURL}/${params}?api_key=${apiKey}${queryString}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await res.json();
  } catch (errors) {
    console.error(errors);
  }
};

const traktFetch = async (params, query) => {
  const apiURL = 'https://api.trakt.tv';
  const clientID = process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID;
  const queryString = query ? `?${query}` : '';
  const token = getToken();

  try {
    const res = await fetch(`${apiURL}/${params}${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'trakt-api-version': '2',
        'trakt-api-key': `${clientID}`,
      },
    });
    return await res.json();
  } catch (errors) {
    console.error(errors);
  }
};

const traktPost = async (params, body) => {
  const apiURL = 'https://api.trakt.tv';
  const clientID = process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID;
  const token = getToken();

  try {
    const res = await fetch(`${apiURL}/${params}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'trakt-api-version': '2',
        'trakt-api-key': `${clientID}`,
      },
      method: 'POST',
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (errors) {
    console.error(errors);
  }
};

export { tmdbFetch, traktFetch, traktPost };

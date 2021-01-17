const tmdbFetch = async params => {
  const apiURL = 'https://api.themoviedb.org/3';
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  try {
    const res = await fetch(`${apiURL}/${params}?api_key=${apiKey}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (errors) {
    console.error(errors);
  }
};

const traktFetch = async (params, token) => {
  const apiURL = 'https://api.trakt.tv';
  const clientID = process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID;

  try {
    const res = await fetch(`${apiURL}/${params}`, {
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

export { tmdbFetch, traktFetch };

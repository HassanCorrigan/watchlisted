import { getToken, revokeToken } from 'helpers/token';
import router from 'next/router';

const auth = () => {
  const token = getToken();

  const data = token
    ? { isAuthenticated: true, token }
    : { isAuthenticated: false, token: '' };

  return data;
};

const logOut = async () => {
  const token = getToken();
  const apiURL = 'https://api.trakt.tv';
  const clientID = process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID;
  const clientSecret = process.env.TRAKT_CLIENT_SECRET;

  try {
    const res = await fetch(`${apiURL}/oauth/revoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        client_id: clientID,
        client_secret: clientSecret,
      }),
    });

    (await res.status) === 200 && revokeToken();
    return router.reload();
  } catch (errors) {
    console.error(errors);
  }
};

export { auth, logOut };
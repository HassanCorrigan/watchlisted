import Cookies from 'universal-cookie';

// Checks if token exists in cookies and returns an object containing
// a value indicating if the user is authenticated and the token.

const getToken = () => new Cookies().get('token');

const auth = () => {
  const token = getToken();

  const data = token
    ? { authenticated: true, token }
    : { authenticated: false, token: '' };

  return data;
};

const logOut = async () => {
  const token = getToken();

  try {
    const res = await fetch('https://api.trakt.tv/oauth/revoke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({
        token,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
    });

    console.log(res);
  } catch (error) {
    console.log(error);
  }

  // return await res.json();
};

// Testing by running the logout function
// logOut();

export { auth, logOut };

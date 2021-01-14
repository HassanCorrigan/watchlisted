import { serialize } from 'cookie';

export default async function handler(req, res) {
  const code = req.query.code;
  const data = await getAccessToken(code);

  res.setHeader(
    'Set-Cookie',
    serialize('token', data.access_token, { path: '/' })
  );

  res.redirect('/');
}

const getAccessToken = async code => {
  const clientID = process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID;
  const clientSecret = process.env.TRAKT_CLIENT_SECRET;

  const body = {
    code: code,
    client_id: clientID,
    client_secret: clientSecret,
    redirect_uri: 'http://localhost:3000/api/auth/',
    grant_type: 'authorization_code',
  };

  try {
    const res = await fetch('https://api.trakt.tv/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

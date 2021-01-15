import Cookies from 'universal-cookie';

// Checks if token exists in cookies and returns an object containing
// a value indicating if the user is authenticated and the token.

const auth = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const data = token
    ? { authenticated: true, token }
    : { authenticated: false, token: '' };

  return data;
};

export default auth;

import Cookies from 'universal-cookie';

const isAuthenticated = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const authenticated = token ? true : false;

  return authenticated;
};

export { isAuthenticated };

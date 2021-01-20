import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getToken = () => cookies.get('token') || null;

const revokeToken = () => cookies.remove('token');

export { getToken, revokeToken };

import Cookies from 'js-cookie';

const getToken = () => Cookies.get('token') || null;

const revokeToken = () => Cookies.remove('token');

export { getToken, revokeToken };

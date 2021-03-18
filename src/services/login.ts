import { API } from '~/constants';
import getUrl from '../utils/getUrl';

/**
 * Authenticate given username and password, and set session token in local
 * storage if successful
 */
const login = async (username: string, password: string) => {
  const url = getUrl(API.Login, {
    username,
    password,
  });

  const response = await fetch(url);
  const data = await response.json();
  const { token } = data;

  localStorage.setItem('token', token);
};

export default login;

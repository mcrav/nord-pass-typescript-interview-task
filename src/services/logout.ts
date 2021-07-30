import { API } from '~/constants';
import getUrl from '../utils/getUrl';

/**
 * Send logout request to server and remove session token from local storage
 */
const logout = async () => {
  const url = getUrl(API.Logout);
  const token = localStorage.getItem('token');

  // Send logout and don't analyze response. If it's a 200 then the logout was
  // successful. If it's a 401 the user is already logged out so no problem.
  await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  // Remove access token from local storage
  localStorage.removeItem('token');
};

export default logout;

import { createContext, useContext, useEffect, useState } from 'react';
import { API } from '~/constants';
import getUrl from '~/utils/getUrl';

interface IUser {
  updateUser: () => void;
  deleteData: () => void;
  errorMessage: string;
  isLoading: boolean;
  username: string;
  email: string;
  id: string;
}

const UserContext = createContext<IUser>({
  updateUser: () => {},
  deleteData: () => {},
  errorMessage: null,
  isLoading: true,
  username: null,
  email: null,
  id: null,
});

export const useUserContext = () => useContext(UserContext);

/**
 * Context provider to allow components access to authenticated user's details
 */
export const UserContextProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string>(null);
  const [email, setEmail] = useState<string>(null);
  const [id, setId] = useState<string>(null);

  /**
   * Get user details associated with session token
   */
  const updateUser = async () => {
    const token = localStorage.getItem('token');
    // When PrivateRoute renders without an authenticated user, there is a
    // brief period where the private component mounts, triggering this
    // effect. The component then rapidly unmounts, meaning the state setting
    // in this function causes "state update on an unmounted component" warnings.
    // By checking if a token is available before continuing this can be avoided.
    if (!token) {
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(getUrl(API.User), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setUsername(data?.username);
      setEmail(data?.email);
      setId(data?.id);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  /**
   * Reset all user details
   */
  const deleteData = () => {
    setErrorMessage(null);
    setIsLoading(false);
    setUsername(null);
    setEmail(null);
    setId(null);
  };

  /**
   * When provider initializes update user details with details corresponding to
   * session token.
   */
  useEffect(() => {
    updateUser();
  }, []);

  const value = {
    updateUser,
    deleteData,
    errorMessage,
    isLoading,
    username,
    email,
    id,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;

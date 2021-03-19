import { useEffect, useState } from 'react';
import getUserItems, { IItem } from '../../services/getUserItems';

/**
 * Get user's password items from server.
 */
const userItemsProvider = ({ passwordUpdates }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<String>();
  const [items, setItems] = useState<Array<IItem>>([]);
  // Effect hook depends on passwordUpdates, so that everytime the user
  // updates a password and this value is incremented, the updated passwords
  // list is requested from the server.
  useEffect(() => {
    (async () => {
      // When PrivateRoute renders without an authenticated user, there is a
      // brief period where the private component mounts, triggering this
      // effect. The component then rapidly unmounts meaning the state setting
      // in this function causes "state update on an unmounted component" warnings.
      // By checking if a token is available before continuing this can be avoided.
      if (!localStorage.getItem('token')) {
        return;
      }
      setIsLoading(true);

      try {
        const userItems = await getUserItems();
        setItems(userItems);
      } catch (error) {
        setErrorMessage(error.message);
      }

      setIsLoading(false);
    })();
  }, [passwordUpdates]);

  return {
    isLoading,
    errorMessage,
    items,
  };
};

export default userItemsProvider;

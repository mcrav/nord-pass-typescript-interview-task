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

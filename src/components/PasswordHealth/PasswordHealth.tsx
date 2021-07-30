import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import List from './components/List/List';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
import useItemsProvider from './useItemsProvider';
import ErrorBlock from '../ErrorBlock';
import LoadingScreen from '../LoadingScreen';
import { useUserContext } from '../UserContext';
import { Routes } from '~/constants';
import itemHasWeakPassword from '~/utils/itemHasWeakPassword';
import itemHasReusedPassword from '~/utils/itemHasReusedPassword';
import itemHasOldPassword from '~/utils/itemHasOldPassword';

/**
 * Main page after login showing user's passwords
 */
const PasswordHealth = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();
  // Use this to track how many times the user has updated the password. By
  // incrementing this value, it can be passed to the `useItemsProvider` and
  // retrigger the useEffect hook that will get the updated passwords list from
  // the server.
  const [passwordUpdates, setPasswordUpdates] = useState(0);
  const { items, isLoading, errorMessage } = useItemsProvider({
    passwordUpdates,
  });

  const handlePasswordUpdate = () => setPasswordUpdates(passwordUpdates + 1);

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen />;
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage} />;
  }
  return (
    <div className="container">
      <Header items={items} username={username} />
      <Filter items={items} />
      <Switch>
        <Route exact path={Routes.PasswordHealth}>
          <List items={items} onPasswordUpdate={handlePasswordUpdate} />
        </Route>
        <Route path={Routes.Weak}>
          <List
            items={items.filter(itemHasWeakPassword)}
            onPasswordUpdate={handlePasswordUpdate}
          />
        </Route>
        <Route path={Routes.Reused}>
          <List
            items={items.filter((item) => itemHasReusedPassword(item, items))}
            onPasswordUpdate={handlePasswordUpdate}
          />
        </Route>
        <Route path={Routes.Old}>
          <List
            items={items.filter((item) => itemHasOldPassword(item))}
            onPasswordUpdate={handlePasswordUpdate}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default PasswordHealth;

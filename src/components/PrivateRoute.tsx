import { FC, useEffect } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { Routes } from '~/constants';

/**
 * If user is not authenticated, send them back to login page.
 * Otherwise show them the page at the given path.
 */
const PrivateRoute: FC<RouteProps> = ({ path, component }) => {
  const { push } = useHistory();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      push(Routes.Login);
    }
  }, [token]);

  return <Route path={path} component={component} />;
};

export default PrivateRoute;

import { FC, useEffect } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { Routes } from '~/constants';

/**
 * If the user is authenticated show them the password health page.
 * Otherwise, show them the given path.
 */
const PublicRoute: FC<RouteProps> = ({ path, component }) => {
  const { push } = useHistory();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      push(Routes.PasswordHealth);
    }
  }, [token]);

  return <Route path={path} component={component} />;
};

export default PublicRoute;

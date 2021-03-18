import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '~/constants';
import { IItem } from '~/services/getUserItems';
import logout from '../../../../services/logout';

import './header-style.scss';

interface IHeader {
  // All password items
  items: Array<IItem>;
  // Username that is logged in
  username: string;
}

/**
 * Page header to show user warnings and logout button
 */
const Header: FC<IHeader> = ({ items, username }) => {
  const { push } = useHistory();

  // Handler for Logout button. Logout and go to Login page.
  const handleLogout = async () => {
    await logout();
    push(Routes.Login);
  };

  return (
    <div className="header">
      <div className="user-section">
        <button onClick={handleLogout}>{`Logout ${username}`}</button>
      </div>
      <h1>{`${items.length} Items are vulnerable`}</h1>
      <span>Create new complex passwords to protect your accounts</span>
    </div>
  );
};

export default Header;

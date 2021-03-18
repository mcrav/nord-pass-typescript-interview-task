import { FC } from 'react';

interface IItemIcon {
  // Title of password item
  title: string;
}

/**
 * Icon to show next to password item in password list.
 */
const ItemIcon: FC<IItemIcon> = ({ title }) => (
  <div className="item-icon">{title.substring(0, 2)}</div>
);

export default ItemIcon;

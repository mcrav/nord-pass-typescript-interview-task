import { IItem } from '~/services/getUserItems';

/**
 * Check if password for given item is used for another site
 * @param item Password item to check
 * @param itemList All password items of user
 */
const itemHasReusedPassword = (item: IItem, itemList: Array<IItem>) => {
  const reusedItems = itemList.filter(
    (listItem) => listItem.password === item.password
  );

  return reusedItems.length > 1;
};

export default itemHasReusedPassword;

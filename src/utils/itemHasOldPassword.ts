import { IItem } from '~/services/getUserItems';

/**
 * Check if item has a password older than 30 days.
 * @param item Item to check if the password is old or not
 * @returns `true` if item password is older than 30 days, otherwise `false`.
 */
const itemHasOldPassword = (item: IItem) => {
  let thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return Date.parse(item.createdAt) < thirtyDaysAgo;
};

export default itemHasOldPassword;

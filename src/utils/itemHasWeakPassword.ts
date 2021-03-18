import { IItem } from '~/services/getUserItems';

/**
 * Check if password for given password item is weak
 * @param item Password item to checks
 */
const itemHasWeakPassword = (item: IItem) => {
  const { password } = item;

  const strength = [
    password.match(/[a-z]/) != null,
    password.match(/[A-Z]/) != null,
    password.match(/[!@#$%^&*]/) != null,
    password.match(/[0-9]/) != null,
  ].filter(Boolean).length;

  return strength > 2;
};

export default itemHasWeakPassword;

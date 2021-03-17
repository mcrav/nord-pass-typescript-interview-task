import { passwords } from '../data';

// Load starting passwords from data and set to array that will be modified
// as passwords are updated.
let items = [...passwords];

/**
 * Update details of given password item
 * @param item Password item to update
 */
export const updateItem = (item) => {
  items = items.map((existingItem) => {
    if (existingItem.id === item.id) {
      return item;
    } else {
      return existingItem;
    }
  });
};

export const getItems = () => {
  return items.map((passwordItem) => {
    const updatedItem = items.find(({ id }) => id === passwordItem.id);

    return {
      ...(updatedItem || passwordItem),
    };
  });
};

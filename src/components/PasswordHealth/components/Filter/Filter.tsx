import { FC } from 'react';
import { Routes } from '~/constants';
import { IItem } from '~/services/getUserItems';
import FilterTab from './components/FilterTab';

import './filter-style.scss';
import itemHasWeakPassword from '~/utils/itemHasWeakPassword';
import itemHasReusedPassword from '~/utils/itemHasReusedPassword';
import itemHasOldPassword from '~/utils/itemHasOldPassword';

interface IFilter {
  // All password items
  items: Array<IItem>;
}

/**
 * Tabs allowing user to view password lists filtered by different criteria
 */
const Filter: FC<IFilter> = ({ items }) => {
  // Get number of passwords that are weak
  const weakItemsCount = items.reduce(
    (count, item) => (itemHasWeakPassword(item) ? count + 1 : count),
    0
  );

  // Get number of passwords that are reused
  const reusedItemsCount = items.reduce(
    (count, item) => (itemHasReusedPassword(item, items) ? count + 1 : count),
    0
  );

  // Get number of passwords that are older than 30 days
  const oldItemsCount = items.reduce(
    (count, item) => (itemHasOldPassword(item) ? count + 1 : count),
    0
  );

  return (
    <div className="filter">
      <FilterTab title="Weak" count={weakItemsCount} path={Routes.Weak} />
      <FilterTab title="Reused" count={reusedItemsCount} path={Routes.Reused} />
      <FilterTab title="Old" count={oldItemsCount} path={Routes.Old} />
    </div>
  );
};

export default Filter;

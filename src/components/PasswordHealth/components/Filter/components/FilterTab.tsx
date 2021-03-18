import { FC } from 'react';
import { useHistory } from 'react-router-dom';

interface IFilterTab {
  // Title of tab
  title: string;
  // Number of passwords after filter applied
  count: number;
  // Path to filtered list for routing
  path: string;
}

/**
 * Tab to click to filter out passwords by different criteria
 */
const FilterTab: FC<IFilterTab> = ({ title, count, path }) => {
  const { push } = useHistory();

  return (
    <div className="filter-tab" onClick={() => push(path)}>
      {`${title} (${count})`}
    </div>
  );
};

export default FilterTab;

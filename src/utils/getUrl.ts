import qs from 'query-string';
import { API } from '../constants';

/**
 * Get full URL for query at given endpoint with given URL params
 * @param endpoint Value from API enum
 * @param params URL params to include
 */
const getUrl = (endpoint: API, params?: Record<string, any>) => {
  const query = qs.stringify(params);

  return `${process.env.API_URL}/${endpoint}${query ? `?${query}` : ''}`;
};

export default getUrl;

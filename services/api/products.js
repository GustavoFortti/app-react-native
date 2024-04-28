import { apiClient, apiClientStatus } from './apiClient';

export const searchByQuey = async (
  query,
  index,
  page = 0,
  sizePage = 30,
  sortOption = null,
  filterOption = null,
  filterOptions = null,
) => {
  try {
    return await apiClient.get('/api/search/query-products', {
      query,
      index,
      page,
      sizePage,
      sortOption,
      filterOption,
      filterOptions,
    }, {});
  } catch (error) {
    console.error('Error searching products:', error.message);
    throw error;
  }
};

export const searchByIndex = async (index) => {
  try {
    return await apiClient.get('/api/search/index', {
      index
    }, {});
  } catch (error) {
    console.error('Error searching products:', error.message);
    throw error;
  }
};

export const checkDatabaseStatus = async () => {
  try {
    return await apiClientStatus.get('/api/search/status');
  } catch (error) {
    console.error('API Error: ', error.message);
    throw error;
  }
};
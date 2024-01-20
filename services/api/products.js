import { apiClient, apiClientStatus } from './apiClient';

export const searchByTitle = async (query, page = 0, size = 8, sort = null, rangeFilter = { "quantidade": {} }) => {
  try {
    return await apiClient.get('/api/search', {
      query,
      page,
      size,
      sort,
      rangeFilter,
    }, {});
  } catch (error) {
    console.error('Error searching products:', error.message);
    throw error;
  }
};

export const searchByIndex = async (query) => {
  try {
    return await apiClient.get('/api/search/index', {
      query
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
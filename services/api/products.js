import { apiClient, apiClientStatus } from './apiClient';

export const searchByTitle = async (query, index, page = 0, size = 30, sort = null, filter = null) => {
  try {
    return await apiClient.get('/api/search/query', {
      query,
      index,
      page,
      size,
      sort,
      filter,
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
import apiClient from './apiClient';

export const searchByTitle = async (query, page = 0, size = 8, sort = null, rangeFilter = { "quantidade": {} }) => {
  try {
    return await apiClient.get('/api/auth/search', {
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
    return await apiClient.get('/api/auth/search/index', {
      query
    }, {});
  } catch (error) {
    console.error('Error searching products:', error.message);
    throw error;
  }
};
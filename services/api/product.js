import apiClient from './apiClient';

export const searchByTitle = async (query, page = 0, size = 8, sort = null) => {
  try {
    return await apiClient.get('/api/auth/search', {
      query,
      page,
      size,
      sort
    });
  } catch (error) {
    console.error('Error searching products:', error.message);
    throw error;
  }
};
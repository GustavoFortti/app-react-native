import axios from 'axios';

const BASE_URL = 'https://nutrifind-api-10f8a344cbba.herokuapp.com';

const apiClient = {
  get: async (path, queryParams = {}, headers = {}) => {

    const adjustedQueryParams = {
      query: queryParams.query,
    };

    if (queryParams.sort) {
      adjustedQueryParams.fieldSort = queryParams.sort.field;
      adjustedQueryParams.direction = queryParams.sort.direction;
    }

    if (queryParams.page && queryParams.size) {
      adjustedQueryParams.page = queryParams.page;
      adjustedQueryParams.size = queryParams.size;
    }

    if (queryParams.rangeFilter?.quantidade) {
      if (queryParams.rangeFilter.quantidade.gte > 1) {
        adjustedQueryParams.quantidadeGte = queryParams.rangeFilter.quantidade.gte;
      }
      if (queryParams.rangeFilter.quantidade.lt > 1) {
        adjustedQueryParams.quantidadeLt = queryParams.rangeFilter.quantidade.lt;
      }
    }

    const url = `${BASE_URL}${path}`;
    console.log('Request URL:', url);

    const config = {
      method: 'get',
      url: url,
      params: adjustedQueryParams,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
    
    console.log('Request Config:', config);

    try {
      const response = await axios(config);

      console.log('Response Status:', response.status);
      console.log('Response results:', response.data.results);

      return response.data;
    } catch (error) {
      console.error('Response Error:', error.response);
      throw error;
    }
  },
};

export default apiClient;

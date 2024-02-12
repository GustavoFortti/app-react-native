import axios from 'axios';

const BASE_URL = 'https://nutrifind-api-10f8a344cbba.herokuapp.com';

const apiClient = {
  get: async (path, queryParams = {}, headers = {}) => {
    let parsedQueryParams = {
      query: queryParams.query,
      index: queryParams.index,
      page: queryParams.page,
      size: queryParams.size,
    };

    if (queryParams.sort) {
      parsedQueryParams['sort'] = {
        by: queryParams.sort.by,
        ascending: queryParams.sort.ascending,
      };
    }

    if (queryParams.filter && queryParams.filter.quantity) {
      parsedQueryParams['filter'] = {
        quantity: {
          ...(queryParams.filter.quantity.gte && { gte: queryParams.filter.quantity.gte }),
          ...(queryParams.filter.quantity.lt && { lt: queryParams.filter.quantity.lt }),
        },
      };
    }

    if (parsedQueryParams.sort) parsedQueryParams.sort = JSON.stringify(parsedQueryParams.sort);
    if (parsedQueryParams.filter) parsedQueryParams.filter = JSON.stringify(parsedQueryParams.filter);

    const url = `${BASE_URL}${path}`;
    
    const config = {
      method: 'get',
      url,
      params: parsedQueryParams,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
    console.log('Request URL:', config);
    
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

const apiClientStatus = {
  get: async (path) => {

    const url = `${BASE_URL}${path}`;

    const config = {
      method: 'get',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios(config);

      return response.data.status;
    } catch (error) {
      // console.error('Response Error:', error.response);
      throw error;
    }
  },
};

export { apiClient, apiClientStatus };
import axios from 'axios';

const BASE_URL = 'https://nutrifind-api-10f8a344cbba.herokuapp.com';

const apiClient = {
  get: async (path, queryParams = {}, headers = {}) => {
    let parsedQueryParams = {};

    if (queryParams.query) parsedQueryParams.query = queryParams.query
    if (queryParams.index) parsedQueryParams.index = queryParams.index
    if (queryParams.page || queryParams.page === 0) parsedQueryParams.page = queryParams.page
    if (queryParams.sizePage) parsedQueryParams.sizePage = queryParams.sizePage

    const sortParam = queryParams.sortOption
    const sort = (
      sortParam && sortParam.field ?
      { field: sortParam.field, order: sortParam.order } :
      null
    )
    if (sort) parsedQueryParams.sort = JSON.stringify(sort);
    
    if (queryParams.filterOption) {
      const rangePriceParam = queryParams.filterOption.rangePrice
      const rangePriceOptions = queryParams.filterOptions.rangePrice
      const rangePrice = (rangePriceParam ?
        {
          field: "price_numeric",
          ...(
            rangePriceParam.min &&
            rangePriceParam.min > rangePriceOptions.min &&
            { gte: rangePriceParam.min }
          ),
          ...(
            rangePriceParam.max &&
            rangePriceParam.max < rangePriceOptions.max &&
            { lt: rangePriceParam.max }
          ),
        } :
        null
      );

      const rangeQntParam = queryParams.filterOption.rangeQnt
      const rangeQntOptions = queryParams.filterOptions.rangeQnt
      const rangeQnt = (rangeQntParam ?
        {
          field: "quantity",
          ...(
            rangeQntParam.min &&
            rangeQntParam.min > rangeQntOptions.min &&
            { gte: rangeQntParam.min }
          ),
          ...(
            rangeQntParam.max &&
            rangeQntParam.max < rangeQntOptions.max &&
            { lt: rangeQntParam.max }
          ),
        } :
        null
      );

      const rangeQuantity = [rangePrice, rangeQnt].filter(item => item !== null);
      const quantity = rangeQuantity.length > 0 ? rangeQuantity : null
      if (quantity) parsedQueryParams.quantity = JSON.stringify(quantity);

      const brand = queryParams.filterOption.brand.map((item) => (item.name))
      const match = brand.length > 0 ? [{ field: "brand", order: brand }] : null
      if (match) parsedQueryParams.match = JSON.stringify(match);
    }
    
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

    console.log(config);

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
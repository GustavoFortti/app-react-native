import axios from 'axios';

const BASE_URL = 'https://nutrifind-api-10f8a344cbba.herokuapp.com';

const apiClient = {
  get: async (path, queryParams = {}, headers = {}) => {
    let parsedQueryParams = {
      index: queryParams.index,
    };

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");

    const query = queryParams.query
    const page = queryParams.page
    const sizePage = queryParams.sizePage

    const sort = queryParams.sortOption
    console.log("sort");
    console.log(sort);
    console.log(sort);
    return ""
    const sortParam = (
      sort.field ?
      { field: sort.field, order: sort.order } :
      null
    )

    const rangePrice = queryParams.filterOption.rangePrice
    const rangePriceOptions = queryParams.filterOptions.rangePrice
    const rangePriceParam = (rangePrice ?
      {
        field: "price_numeric",
        ...(
          rangePrice.min &&
          rangePrice.min > rangePriceOptions.min &&
          { gte: rangePrice.min }
        ),
        ...(
          rangePrice.max &&
          rangePrice.max < rangePriceOptions.max &&
          { lt: rangePrice.max }
        ),
      } :
      null
    );

    const rangeQnt = queryParams.filterOption.rangeQnt
    const rangeQntOptions = queryParams.filterOptions.rangeQnt
    const rangeQntParam = (rangeQnt ?
      {
        field: "quantity",
        ...(
          rangeQnt.min &&
          rangeQnt.min > rangeQntOptions.min &&
          { gte: rangeQnt.min }
        ),
        ...(
          rangeQnt.max &&
          rangeQnt.max < rangeQntOptions.max &&
          { lt: rangeQnt.max }
        ),
      } :
      null
    );

    const rangeQuantity = [rangePriceParam, rangeQntParam].filter(item => item !== null);
    const quantity = rangeQuantity.length !== 0 ? rangeQuantity : null

    const brand = filterOption.brand.map((item) => (item.name))
    const match = brand.length !== 0 ? [{ field: "brand", order: brand }] : null

    // if (parsedQueryParams.sort) parsedQueryParams.sort = JSON.stringify(parsedQueryParams.sort);
    // if (parsedQueryParams.filter) parsedQueryParams.filter = JSON.stringify(parsedQueryParams.filter);

    return ""
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
import axios from 'axios';

const BASE_URL = 'https://nutrifind-api-10f8a344cbba.herokuapp.com';

const apiClient = {
  get: async (path, queryParams = {}, headers = {}) => {
    // Ajusta os parâmetros da query para corresponder ao comando curl

    const adjustedQueryParams = {
      query: queryParams.query,
      page: queryParams.page,
      size: queryParams.size,
    };

    if (queryParams.sort) {
      adjustedQueryParams.fieldSort = queryParams.sort.field;
      adjustedQueryParams.direction = queryParams.sort.direction;
    }

    if (queryParams.rangeFilter.quantidade) {
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
    
    console.log('Request Config:', config); // Mostra a confrguração da requisição que será enviada

    try {
      const response = await axios(config);

      console.log('Response Status:', response.status); // Mostra o status da resposta
      console.log('Response totalpages:', response.data.totalPages); // Mostra o status da resposta
      // console.log('Response results:', response.data.results); // Mostra o status da resposta

      return response.data; // Retorna os dados da resposta
    } catch (error) {
      console.error('Response Error:', error.response); // Mostra o erro da resposta, se houver

      // Aqui você pode querer lançar um erro customizado ou tratar o erro de outra forma
      throw error;
    }
  },
};

export default apiClient;

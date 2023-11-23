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

    console.log("adjustedQueryParams")
    console.log(adjustedQueryParams)
    console.log("adjustedQueryParams")

    // Constrói a URL final
    const url = `${BASE_URL}${path}`;
    console.log('Request URL:', url); // Mostra a URL que será chamada

    // Configuração do Axios para a chamada GET
    const config = {
      method: 'get',
      url: url,
      params: adjustedQueryParams, // Axios automaticamente trata os parâmetros da query
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    console.log('Request Config:', config); // Mostra a confrguração da requisição que será enviada

    try {
      const response = await axios(config);

      // console.log('Response Status:', response.status); // Mostra o status da resposta
      // console.log('Response Status:', response.data); // Mostra o status da resposta
      // console.log('Response results:', response.data.results); // Mostra o status da resposta

      return response.data; // Retorna os dados da resposta
    } catch (error) {
      // console.error('Response Error:', error.response); // Mostra o erro da resposta, se houver

      // Aqui você pode querer lançar um erro customizado ou tratar o erro de outra forma
      throw error;
    }
  },
};

export default apiClient;

import axios from 'axios';

const request = (baseURL, authHeader = null) => {
  const defaultOptions = {
    headers: {
      Authorization: authHeader || '',
      'Access-Control-Allow-Origin': '*',
    },
    baseURL,
  };

  const get = (url, options = {}) =>
    axios
      .get(url, { ...defaultOptions, ...options })
      .then(response => response.data);

  const post = (url, data, options = {}) =>
    axios
      .post(url, data, { ...defaultOptions, ...options })
      .then(response => response.data);

  const deleteFunc = (url, options = {}) =>
    axios.delete(url, { ...defaultOptions, ...options });

  return {
    get,
    post,
    delete: deleteFunc,
  };
};

export default request;

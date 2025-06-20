const { tokenBottleneck } = require('../bottleneck').endpointListeners;
const axios = require('axios');

const getToken = async (token) => {
  try {
    const url = 'https://oauth.nitrado.net/token';
    const response = await tokenBottleneck.schedule(() =>
      axios.get(url, { headers: { 'Authorization': token } }));

    if (response.status === 200) return response.data.data.token.scopes;

  } catch (error) {
    if (error.response.status === 401) return [];
    return { status: error.response?.status || 500 };
  };
}

module.exports = { getToken };
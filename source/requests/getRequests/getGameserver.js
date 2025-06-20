const { gameserverBottleneck } = require('../bottleneck').endpointListeners;
const axios = require('axios');

const getGameserver = async (token, service) => {
  try {
    const url = `https://api.nitrado.net/services/${service.id}/gameservers`;
    const response = await gameserverBottleneck.schedule(() =>
      axios.get(url, { headers: { 'Authorization': token } }));

    if (response.status === 200) return response.data.data.gameserver;

  } catch (error) {
    return { status: error.response?.status || 500 };
  };
}

module.exports = { getGameserver };
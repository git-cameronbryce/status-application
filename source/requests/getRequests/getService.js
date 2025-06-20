const { serviceBottleneck } = require('../bottleneck').endpointListeners;
const axios = require('axios');

const platforms = ['arkxb', 'arkps', 'arkse', 'arkxbosg', 'arkpsosg', 'arkswitch'];

const getService = async (token) => {
  try {
    const url = 'https://api.nitrado.net/services';

    const response = await serviceBottleneck.schedule(() =>
      axios.get(url, { headers: { 'Authorization': token } }));

    if (response.status === 200) {
      return response.data.data.services.filter(service =>
        platforms.includes(service.details.folder_short)
      );
    };

  } catch (error) {
    return { status: error.response?.status || 500 };
  };
};

module.exports = { getService };
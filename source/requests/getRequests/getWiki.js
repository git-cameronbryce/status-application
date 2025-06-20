const { wikiBottleneck } = require('../bottleneck').endpointListeners;
const { parseWiki } = require('../../services/parseWiki');
const axios = require('axios');

const getWiki = async (ip, port) => {
  try {
    const url = 'http://arkdedicated.com/xbox/cache/unofficialserverlist.json';
    const response = await wikiBottleneck.schedule(() => axios.get(url));

    if (response.status === 200) return await parseWiki(response.data, ip, port)

  } catch (error) {
    if (error.response.status === 401) return [];
    return { status: error.response?.status || 500 };
  };
}

module.exports = { getWiki };
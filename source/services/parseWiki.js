const parseWiki = async (response, ip, port) => {
  try {
    const filtered = response
      .filter(server => server.IP === ip && server.Port === port)
      .map(server => ({
        current: server.NumPlayers,
        maximum: server.MaxPlayers
      }));

    if (filtered.length === 0) return { current: 0, maximum: 0 };
    return filtered[0];

  } catch (error) {
    return { status: error.response?.status || 500 };
  };
}

module.exports = { parseWiki };
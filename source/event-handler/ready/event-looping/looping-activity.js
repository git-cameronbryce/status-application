const { getGameserver } = require('../../../requests/getRequests/getGameserver');
const { getService } = require('../../../requests/getRequests/getService');
const { getWiki } = require('../../../requests/getRequests/getWiki');
const { ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = async (client) => {
  const updateActivity = async () => {
    // Read tokens from db.json
    const dbPath = path.join(__dirname, '../../../other-config/db.json');
    const { requiredToken, optionalToken } = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    let totalMaps = 0, currentPlayers = 0, maxPlayers = 0;
    const allTokens = [requiredToken, optionalToken].filter(Boolean);

    await Promise.all(allTokens.map(async token => {
      const services = await getService(token);

      await Promise.all(services.map(async service => {
        const { ip, port } = await getGameserver(token, service);
        const wiki = await getWiki(ip, port);

        if (wiki && (wiki.current > 0 || wiki.maximum > 0)) {
          currentPlayers += wiki.current;
          maxPlayers += wiki.maximum;
          totalMaps++;
        }
      }));
    }));

    client.user.setActivity(`${totalMaps} Maps, ${currentPlayers} Players`, {
      type: ActivityType.Watching
    });
  };

  updateActivity();
  setInterval(updateActivity, 50000);
  console.log('Activity loop started...');
};
const { getToken } = require('../../../requests/getRequests/getToken');
const { Events } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'ase-modal-setup') {
        await interaction.deferReply({ ephemeral: true });
        const requiredToken = interaction.fields.getTextInputValue('ase-nitrado-token-required');
        const optionalToken = interaction.fields.getTextInputValue('ase-nitrado-token-optional');

        const [requiredScopes, optionalScopes] = await Promise.all([
          getToken(requiredToken),
          getToken(optionalToken)
        ]);

        const requiredValid = requiredScopes.length > 0;
        const optionalValid = optionalScopes.length > 0;

        if (!requiredValid || (optionalToken && !optionalValid)) {
          return await interaction.followUp({ content: 'Setup failure, ensure your token scopes are configured correctly.' });
        }

        const data = requiredValid && optionalValid
          ? { nitrado: { requiredToken, optionalToken } }
          : { nitrado: { requiredToken } };

        // Write only the nitrado info to db.json
        const dbPath = path.join(__dirname, '../../../other-config/db.json');
        fs.writeFileSync(dbPath, JSON.stringify(data.nitrado, null, 2));

        await interaction.followUp({ content: 'Token uploaded to file, status will update soon.' });
      };
    };
  });
};
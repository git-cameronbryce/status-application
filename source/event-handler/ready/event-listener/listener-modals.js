const { getToken } = require('../../../requests/getRequests/getToken');
const { db } = require('../../../script');
const { Events } = require('discord.js');

module.exports = (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'ase-modal-setup') {
        await interaction.deferReply({ ephemeral: true });

        const roles = await interaction.guild.roles.fetch();
        const action = roles.map(async role => role.name === 'Bot Permission' ? await role.delete() : null);
        try { await Promise.all(action) } catch (error) { return await interaction.followUp({ content: 'In your settings, move the bot role higher.' }) };

        await interaction.guild.roles.create({
          name: 'Bot Permission',
          color: '#ffffff'
        });

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

        await db.collection('ase-configuration').doc(interaction.guild.id).set(data, { merge: true });
        await interaction.followUp({ content: 'Token uploaded to database, status will update soon.' });
      };
    };
  });
};
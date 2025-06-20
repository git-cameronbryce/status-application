const { SlashCommandBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const { ButtonKit } = require('commandkit');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ase-setup-account')
    .setDescription('Follow the onboarding process to initialize your account.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  run: async ({ interaction }) => {
    await interaction.deferReply({ ephemeral: false });

    const primaryButton = new ButtonKit()
      .setCustomId('ase-setup-token')
      .setLabel('Upload Cluster Token')
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder()
      .addComponents(primaryButton);

    const embed = new EmbedBuilder()
      .setDescription("**Ark Survival Evolved**\n**Account Setup & Overview**\nTo begin the setup process, you will need to obtain your token following this [video preview](https://example.com) allowing us to directly connect to your cluster.\n\n**Additional Information**\nThis application is a private-only project.")
      .setFooter({ text: 'Note: Contact support if issues persist.' })
      .setImage('https://i.imgur.com/JZzjBOb.png')
      .setColor(0x2ecc71);

    await interaction.followUp({ embeds: [embed], components: [row] });
  },
};
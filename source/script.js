const { discord } = require('./other-config/config.json');
const { Client, GatewayIntentBits } = require('discord.js');
const { CommandKit } = require('commandkit');
const path = require('path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

new CommandKit({
  client,
  commandsPath: path.join(__dirname, 'command-handler'),
  eventsPath: path.join(__dirname, 'event-handler'),
  bulkRegister: true
});

client.login(discord.token)
  .then(() => console.log('Client logged in...'));
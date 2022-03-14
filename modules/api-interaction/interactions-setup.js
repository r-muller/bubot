const {
  DISCORD_token: token,
  DISCORD_clientId: clientId,
} = process.env;

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('user').setDescription('Replies with user info!')
    .addSubcommand(subcommand => subcommand
      .setName('add')
      .setDescription('Add a user')
      .addUserOption(option => option.setName('username').setDescription('The user').setRequired(true)))
    .addSubcommand(subcommand => subcommand
      .setName('remove')
      .setDescription('Remove a user')
      .addUserOption(option => option.setName('username').setDescription('The user').setRequired(true))),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);

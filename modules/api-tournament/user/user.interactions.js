const { SlashCommandBuilder } = require('@discordjs/builders');

const user = new SlashCommandBuilder().setName('user').setDescription('User commands');

const UserInteractions = [

  user
  /**
   * /user add :username :rank
   */
    .addSubcommand(subcommand => subcommand
      .setName('add')
      .setDescription('Add a user')
      .addUserOption(option => option.setName('username').setDescription('The user').setRequired(true))
      .addNumberOption(option => option.setName('rank').setDescription('User rank').setRequired(true)))

  /**
   * /user remove :username
   */
    .addSubcommand(subcommand => subcommand
      .setName('remove')
      .setDescription('Remove a user')
      .addUserOption(option => option.setName('username').setDescription('The user').setRequired(true))),
];

module.exports = UserInteractions;

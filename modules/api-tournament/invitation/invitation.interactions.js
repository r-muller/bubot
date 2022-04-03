/* eslint-disable function-paren-newline */
const { SlashCommandBuilder } = require('@discordjs/builders');

const invitation = new SlashCommandBuilder().setName('invit').setDescription('Invitation commands');

const InvitationInteractions = [

  invitation
    /**
   * [REPORT] /invit all
   */
    .addSubcommand(subcommand => subcommand
      .setName('all')
      .setDescription('List all your invitations')
      .addStringOption(option => option.setName('filter')
        .setDescription('Choose')
        .addChoice('Sent', 'SENT')
        .addChoice('Receive', 'RECEIVE'))
    )

  /**
   * [POST] /invit send :username
   */
    .addSubcommand(subcommand => subcommand
      .setName('send')
      .setDescription('Send invitation to your opponent')
      .addUserOption(option => option.setName('username').setDescription('Your opponent').setRequired(true))
    )

  /**
   * [PUT] /invit response :status
   */
    .addSubcommand(subcommand => subcommand
      .setName('response')
      .setDescription('Respond to your opponent')
      .addNumberOption(option => option.setName('invitation').setDescription('The invitation id').setRequired(true))
      .addStringOption(option => option.setName('response')
        .setDescription('Your response')
        .setRequired(true)
        .addChoice('Accept', 'ACCEPTE')
        .addChoice('Decline', 'DECLINE'))
    ),
];

module.exports = InvitationInteractions;

/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const { MessageEmbed } = require('discord.js');

const UserControllers = require('@bubot/api-tournament/user/user.controllers');
const InvitationControllers = require('@bubot/api-tournament/invitation/invitation.controllers');

const ping = require('./ping');

const replyError = (interaction, message) => Promise.resolve()
  .then(() => {
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Error')
      .setDescription(message);

    return interaction.reply({ ephemeral: true, embeds: [embed] });
  });

const interactionsOn = (context) => {
  const { interaction } = context;

  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    ping(interaction);
  } else if (interaction.commandName === 'user') {
    UserControllers[`${interaction.options.getSubcommand()}`](context).catch(({ message }) => replyError(interaction, message));
  } else if (interaction.commandName === 'invit') {
    InvitationControllers[`${interaction.options.getSubcommand()}`](context).catch(({ message }) => replyError(interaction, message));
  }
};

module.exports = interactionsOn;

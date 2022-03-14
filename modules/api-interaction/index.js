/* eslint-disable no-underscore-dangle */
// const UserRoutes = require('@bubot/api-tournament/user/user.routes');
const ping = require('./ping');

const interactions = (context) => {
  const { interaction } = context;

  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    ping(interaction);
  } else if (interaction.commandName === 'user') {
    console.log('🚀 ~ file: index.js ~ line 13 ~ interactions ~ interaction.options._hoistedOptions', interaction.options._hoistedOptions);
    console.log('🚀 ~ file: index.js ~ line 13 ~ interactions ~ interaction data resolved', interaction.options.data[0].options, interaction.options.resolved);
  }
};

module.exports = interactions;

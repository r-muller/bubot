const ping = require('./ping');

const interactions = (context) => {
  const { interaction } = context;

  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    ping(interaction);
  }
};

module.exports = interactions;

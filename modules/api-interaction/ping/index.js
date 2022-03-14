const ping = (interaction) => {
  console.log('🚀 ~ file: index.js ~ line 2 ~ ping ~ interaction', interaction);
  return interaction.reply('Double Pong!');
};

module.exports = ping;

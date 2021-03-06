const interactions = [
  require('@bubot/api-tournament/user/user.interactions'),
  require('@bubot/api-tournament/invitation/invitation.interactions'),
];

const commands = interactions.reduce((acc, interaction) => {
  acc.push(...Object.values(interaction).map(command => command.toJSON()));
  return acc;
}, []);

module.exports = commands;

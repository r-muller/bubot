const {
  userMention, memberNicknameMention, channelMention, roleMention,
} = require('@discordjs/builders');

const contextUserMention = ({ reactions: { message: { author } } }) => userMention(author.id);

module.exports = {
  contextUserMention,
  userMention,
  memberNicknameMention,
};

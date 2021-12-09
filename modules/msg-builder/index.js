const {
  userMention, memberNicknameMention, channelMention, roleMention,
} = require('@discordjs/builders');

const mentionUser = ({ reactions: { message: { author } } }) => userMention(author.id);

module.exports = {
  mentionUser,
};

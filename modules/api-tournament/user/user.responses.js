const { userMention } = require('@bubot/utils/MessageBuilder');

module.exports = class UserResponses {
  static create(context, newData) {
    const { reactions: { message } } = context;
    const { extrefId } = newData;
    message.channel.send(`User ${extrefId} successfuly added !`);
  }

  static update(context, newData) {
    const { reactions: { message }, payload: { rank } } = context;
    const { userRank, extrefId } = newData;
    message.channel.send(`User ${extrefId} successfuly updated to rank (${userRank || rank}) !`);
  }
};

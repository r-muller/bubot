// const { userMention } = require('@bubot/utils/MessageBuilder');

module.exports = class UserResponses {
  static create(context, newData) {
    const { interaction } = context;
    const { extrefId } = newData;
    return Promise.resolve()
      .then(() => interaction.reply(`User <@!${extrefId}> successfuly added !`));
  }

  static update(context, newData) {
    const { interaction } = context;
    const { extrefId, userRank: [{ rank }] } = newData;
    console.log('🚀 ~ file: user.responses.js ~ line 14 ~ UserResponses ~ update ~ newData', newData);
    return Promise.resolve()
      .then(() => interaction.reply(`User <@!${extrefId}> successfuly updated to rank ${rank} !`));
  }
};

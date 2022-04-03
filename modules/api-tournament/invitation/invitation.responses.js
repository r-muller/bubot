// const { userMention } = require('@bubot/utils/MessageBuilder');

module.exports = class UserResponses {
  static send(context, newData) {
    const { interaction, fetchedUserHimself, fetchedUser } = context;

    return Promise.resolve()
      .then(() => interaction.reply(`User <@!${fetchedUserHimself.extrefId}> successfuly invite <@!${fetchedUser.extrefId}> !`));
  }
};

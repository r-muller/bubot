const { getUsersMentionedInContext, findUserByExtrefId } = require('@bubot/utils/parseDiscordCommands');

class UserPayloads {
  static Post(context) {
    const { reqParams } = context;

    return Promise.resolve()
      .then(() => getUsersMentionedInContext(context))
      .then(users => findUserByExtrefId(users, reqParams.extrefId))
      .then(({ username, discriminator }) => ({
        ...reqParams,
        username,
        discriminator,
      }))
      .then(context.$$mergeAndForward('payload'))
      .then((payload) => {
        console.log('🚀 ~ file: user.payloads.js ~ line 17 ~ UserPayloads ~ .then ~ payload', payload);
      });
  }

  static Put(context) {
    const { reqParams } = context;

    return Promise.resolve()
      .then(() => getUsersMentionedInContext(context))
      .then(users => findUserByExtrefId(users, reqParams.extrefId))
      .then(({ username, discriminator }) => ({
        ...reqParams,
        username,
        discriminator,
      }))
      .then(context.$$mergeAndForward('payload'));
  }
}

module.exports = UserPayloads;

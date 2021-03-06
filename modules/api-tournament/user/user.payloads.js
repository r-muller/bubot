class UserPayloads {
  static Post(context) {
    const { interaction: { options } } = context;

    return Promise.resolve()
      .then(() => {
        const guildMember = options.getMember('username');
        return {
          username: guildMember.user.username,
          discriminator: guildMember.user.discriminator,
          extrefId: guildMember.user.id,
        };
      })
      .then(context.$$mergeAndForward('payload'));
  }

  static Put(context) {
    const { interaction: { options } } = context;

    return Promise.resolve()
      .then(() => {
        const guildMember = options.getMember('username');
        const rank = options.getNumber('rank');

        return {
          extrefId: guildMember.user.id,
          rank,
        };
      })
      .then(context.$$mergeAndForward('payload'));
  }
}

module.exports = UserPayloads;

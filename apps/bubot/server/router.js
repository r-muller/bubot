/* eslint-disable no-multi-spaces */
const Router = require('@bubot/utils/Router');

const router = new Router('router');

const {
  DISCORD_clientId: clientId,
} = process.env;

const isDisableGuild = (guildId) => {
  const disableGuild = [
    { label: 'UbuBotSchool', id: '917834959522246666' },
  ];

  return !!disableGuild.filter(({ id }) => id === guildId).length;
};

function CreateUriMW() {
  return (context) => {
    const { guildId, content, author } = context;

    if (!isDisableGuild(guildId) && author.id !== clientId) {
      if (content.substring(0, 2) === '::') {
        return context.$$mergeContext({ uri: '/commande' });
      }
      if (content.substring(0, 2) === 't:') {
        return context.$$mergeContext({ uri: '/tournament' });
      }
      return context.$$mergeContext({ uri: '/message' });
    }

    return undefined;
  };
}

module.exports = (...args) => Promise.resolve(...args)
  .then(router.redirect(CreateUriMW(),     require('../../../modules/routes')));

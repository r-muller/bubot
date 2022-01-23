/* eslint-disable no-multi-spaces */
/* LANCE LE SERVEUR AVEC : npm start */

/**
* INVITE LE BOT AVEC CE LIEN
* https://discord.com/oauth2/authorize?client_id=917404112352575519&permissions=8&scope=bot
*/

const {
  DISCORD_token: token,
  DISCORD_clientId: clientId,
} = process.env;

const { Client, Intents } = require('discord.js');
const Context = require('../../../modules/utils/Context');
const Router = require('../../../modules/utils/Router');
// const Worker = require('../../../modules/utils/Worker');

const interactions = require('../../../modules/interaction-api');

const router = new Router('routerBase');
// Initialize Bot
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});
client.login(token);

client.on('ready', () => {
  const Guilds = client.guilds.cache.map(guild => guild.id);
  console.log('Connected to:', Guilds);
  console.log('Logged in as: ', client.user.tag);
});

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

// Worker.start('./modules/worker-api/threads/index.js');

client.on('messageCreate',      router.redirect(CreateUriMW(),     require('../../../modules/routes')));

/**
 * @todo
 * faire le MiddleWare pour les interactions
 */
client.on('interactionCreate', interaction => interactions(Context.of({ interaction })));

/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
/* LANCE LE SERVEUR AVEC : yarn start:local */

/**
* INVITE LE BOT AVEC CE LIEN
* https://discord.com/api/oauth2/authorize?client_id=917404112352575519&permissions=8&scope=bot%20applications.commands
*/

const {
  DISCORD_token: token,
  DISCORD_clientId: clientId,
} = process.env;

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents } = require('discord.js');
const Context = require('@bubot/utils/Context');
// const Worker = require('../../../modules/utils/Worker');

const commandsRouter = require('./router');

const interactionsOn = require('../../../modules/api-interaction');

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

function startDiscordServer(dsClient) {
  return Promise.resolve()
    .then(() => {
      const rest = new REST({ version: '9' }).setToken(token);
      const commands = require('./slashCommands');
      commands.forEach((command) => {
        console.log('🚀 ~ file: index.js ~ line 55 ~ .then ~ commands', command);
      });

      return rest.put(Routes.applicationCommands(clientId), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
    })
    .then(() => dsClient.login(token))
    .then(() => dsClient.on('ready', () => {
      const Guilds = dsClient.guilds.cache.map(guild => guild.id);
      console.log('Connected to:', Guilds);
      console.log('Logged in as: ', dsClient.user.tag);
    }))
    // .then(() => dsClient.on('messageCreate',  commandsRouter))

  /**
   * @todo
   * faire le MiddleWare pour les interactions
   */
    .then(() => dsClient.on('interactionCreate', interaction => interactionsOn(Context.of({ interaction }))));
}

startDiscordServer(client);

// Worker.start('./modules/worker-api/threads/index.js');

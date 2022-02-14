const dbSetup = require('@bubot/db-setup');
const knex = require('@bubot/utils/knex');

const ecosystem = require('./ecosystem.config');
const { http, pm2 } = require('./utils');

before(function() {
  this.timeout(10000);

  console.log(ecosystem);

  return dbSetup.run
    .then(() => pm2.connect())
    .then(() => pm2.safeDeleteAll(ecosystem)) // clean pm2 config
    .then(() => pm2.start(ecosystem))
    // TODO: use ipc to detect ws ready
    .then(() => new Promise(resolve => setTimeout(resolve, 1000))) // wait for ws to be online
    .then(() => http.post('/authenticate', {
      passPhrase: '1234',
      passName: 'thomas@manacorp.eu',
      method: 'UBU',
    }))
    .then(() => Promise.resolve());
});

after(() => Promise.resolve()
  .then(() => pm2.stopAll(ecosystem))
  .then(() => pm2.disconnect())
  .then(() => knex.destroy()));

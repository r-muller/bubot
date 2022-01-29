const Log = require('debug-level')('sql');
const knex = require('knex')(require('../../conf/database').knexConf);

// knex.on('connect', (client) => {
//   client.query('SET search_path TO public, sales');
// });
knex.on('query', (queryData) => {
  Log.debug(`${new Date().toLocaleString()} ::: (${queryData.method}) ([${queryData.bindings}]) => ${queryData.sql}`);
});

module.exports = knex;

/* eslint-disable max-len */
/* eslint global-require: 0 */
/* eslint no-console: 0 */
const Log = require('debug-level')('db-setup');

const { Client } = require('pg');

// let files = require('@clark/db-setup/common');

// if (process.env.SETUP === 'light') files = require('@clark/db-setup/empty');
// if (process.env.SETUP === 'lex') files = require('@clark/db-setup/lex');

// const { createLoggers, Log } = require('@alfred/loggers-builder');

// const Logger = createLoggers().get(Log.DATABASE);

const {
  DATABASE_host: host,
  DATABASE_port: port,
  DATABASE_database: database,
  DATABASE_user: user,
  DATABASE_password: password,
} = process.env;

console.log(`Env: ${process.env.NODE_ENV} -> dbsetup on ${host} in database ${database} with user ${user}`);

/**
 * [client]
 * @type {Client}
 */
const client = new Client({
  host,
  port,
  database,
  user,
  password,
  schema: 'public',
  // ssl: { rejectUnauthorized: false },
});

/**
 * @method fs
 * @param  {String} file
 * @return {String}
 */
const fs = (file) => {
  Log.debug(`running '${file}'`);
  return require('fs')
    .readFileSync(`${__dirname}/sql/${file}.sql`)
    .toString();
};

/**
 * [connect]
 */
const connect = () => {
  client.connect((err) => {
    if (err) console.log('connection error', err.stack);
    else console.log('connected to pg');
  });
};

/**
 * [DbSetup description]
 */
class DbSetup {
  /**
   * @method constructor
   */
  constructor() {
    this.client = client;
    connect();
  }

  /**
   * @method run
   * @return {[type]} [description]
   */
  get run() {
    return Promise.resolve()
      .then(() => client.query('SELECT truncate_tables();'))

    // .then(() => files({ client, fs }))

    // .then(() => client.query(fs('triggers')))
    // .catch((e) => {
    //   console.error(e.message, e);
    //   throw e;
    // })

      .finally(() => this.client.end());
  }
}

module.exports = new DbSetup();

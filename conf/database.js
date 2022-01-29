const { knexSnakeCaseMappers } = require('objection');

const {
  DATABASE_host: host,
  DATABASE_port: port,
  DATABASE_database: database,
  DATABASE_user: user,
  DATABASE_password: password,
} = process.env;

let knexConf;
switch (process.env.NODE_ENV) {
  case 'test':
    console.log(`Env: ${process.env.NODE_ENV} -> knex run postgres on ${host} in database ${database} with user ${user}`);
    knexConf = {
      debug: false,
      client: 'postgres',
      connection: {
        host,
        port,
        database,
        user,
        password,
      },
      ...knexSnakeCaseMappers(),
      asyncStackTraces: true,
      useNullAsDefault: true,
    };
    break;
  case 'development':
    console.log(`Env: ${process.env.NODE_ENV} -> knex run postgres on ${host} in database ${database} with user ${user}`);
    knexConf = {
      debug: false,
      client: 'postgres',
      connection: {
        host,
        port,
        database,
        user,
        password,
      },
      ...knexSnakeCaseMappers(),
      useNullAsDefault: true,
    };
    break;
  case 'production':
    console.log(`Env: ${process.env.NODE_ENV} -> knex run postgres on ${host} in database ${database} with user ${user}`);
    knexConf = {
      debug: false,
      client: 'postgres',
      connection: {
        host,
        port,
        database,
        user,
        password,
      },
      ...knexSnakeCaseMappers(),
      useNullAsDefault: true,
    };
    break;
  default:
    /* istanbul ignore next */
    throw new Error(`NODE_ENV is not test, development or production, ${process.env.NODE_ENV} instead`);
}
module.exports = { knexConf };

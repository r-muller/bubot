/* eslint no-console: 0 */
const dbSetup = require('@bubot/db-setup/index');

// const server = require('../server/server');
// const router = require('../server/router');

// server.use(router);

/**
 * @method setup
 */
const setup = () => {
  console.log('Run test: Setup called');

  return Promise.all([
    dbSetup.run,
    // server.start(),
  ])
    .then(() => console.log('Setup done.'))
    .catch((e) => {
      console.error('Setup failed!');
      return Promise.reject(e);
    });
};

/**
 * @method teardown
 */
const teardown = () => {
  console.log('Run test: Teardown called');

  return Promise.all([
    // server.close(),
  ])
    .then(() => {
      console.log('Teardown done.');
    })
    .catch((e) => {
      console.error('Teardown failed!');
      return Promise.reject(e);
    });
};

module.exports = { setup, teardown };

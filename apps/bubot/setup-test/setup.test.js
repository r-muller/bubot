// const { client } = require('@clark/utils/redis');

// const RedisConnector = require('@clark/src-redis/connector');
// const { PublishClient } = require('@clark/core-mq');

// PublishClient.sourceClient(RedisConnector);

// before(() => PublishClient
//   .init()
//   .catch((e) => {
//     console.error(e);
//     process.exit(-1); // eslint-disable-line
//   }));

after(() => {
  console.log('teardown database start');
  return require('@bubot/utils/knex').destroy()
    // .then(() => PublishClient.end())
    .then(() => {
      // client.end(false);
      console.log('teardown database end');
    });
});

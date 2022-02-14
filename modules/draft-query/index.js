/* eslint-disable no-process-exit */
const User = require('@bubot/data-dealer/User');

const payload = {
  username: 'Acri',
  discriminator: '0317',
  extrefId: '<@!226722927838625791>',
};

const query = User.query()
  .insertAndFetch(payload);

Promise.resolve()
  .then(() => query)
  .then((res) => {
    console.log('🚀 ~ file: index.js ~ line 8 ~ .then ~ response', JSON.stringify(res, null, 2));
  })
  .then(() => process.exit(0))
  .catch((e) => {
    console.log('🚀 ~ file: index.js ~ line 25 ~ e', e);
    process.exit(1);
  });

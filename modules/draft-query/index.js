/* eslint-disable no-process-exit */
const Invitation = require('@bubot/data-dealer/Invitation');
const moment = require('moment');

const payload = {
  status: 'DELIVRED',
  createdOn: moment().format(),
  endedOn: null,
};

const query = Invitation.query()
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

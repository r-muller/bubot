/* eslint-disable no-process-exit */
/* eslint no-console: 0 */

require('.')
  .run
  .then(() => console.log('OK.'))
  .catch((e) => {
    console.log('🚀 ~ file: run.js ~ line 8 ~ e', e);
    console.error('NOK!');
    process.exit(1);
  });

const moment = require('moment');

module.exports = () => ({
  status: 'DELIVRED',
  createdOn: moment().format(),
  endedOn: null,
});

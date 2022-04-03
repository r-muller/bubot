const moment = require('moment');

module.exports = () => ({
  status: 'DELIVRED',
  createdOn: moment().format(),
  endedOn: null,
  hasUser: [{
    userUid: 1,
    isOwner: true,
  },
  {
    userUid: 2,
    isOwner: false,
  }],
});

const Joi = require('joi');

const UserRankNewDataSc = Joi.object().keys({
  userUid: Joi.number().required(),
  rank: Joi.string().required(),
});

module.exports = {
  UserRankNewDataSc,
};

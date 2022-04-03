const Joi = require('joi');

const RankSc = Joi.object().keys({
  rank: Joi.number().required(),
});

const UserRankNewDataSc = Joi.object().keys({
  userUid: Joi.number().required(),
}).concat(RankSc);

module.exports = {
  RankSc,
  UserRankNewDataSc,
};

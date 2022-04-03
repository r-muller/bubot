const Joi = require('joi');

const { UserRankNewDataSc } = require('./userRank');

const UidSc = Joi.object().keys({
  uid: Joi.number().required(),
});

const UserExtrefIdSc = Joi.object().keys({
  extrefId: Joi.string().required(),
});

const UserBaseSc = Joi.object().keys({
  username: Joi.string().required(),
  discriminator: Joi.string().required(),
}).concat(UserExtrefIdSc);

const UserWithRankNestingNewDataSc = Joi.object().keys({
  userRank: Joi.array().items(UserRankNewDataSc.required()).required(),
}).concat(UserBaseSc).concat(UidSc);

module.exports = {
  UidSc,
  UserBaseSc,
  UserExtrefIdSc,
  UserNewDataSc: UserBaseSc.concat(UidSc),
  UserWithRankNestingNewDataSc,
};

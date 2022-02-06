const Joi = require('joi');

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

module.exports = {
  UidSc,
  UserBaseSc,
  UserNewDataSc: UserBaseSc.concat(UidSc),
};

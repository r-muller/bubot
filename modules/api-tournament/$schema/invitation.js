const Joi = require('joi');

const IidSc = Joi.object().keys({
  iid: Joi.number().required(),
});

const InvitationBaseSc = Joi.object().keys({
  status: Joi.string().required(),
  createdOn: Joi.date().required(),
  endedOn: Joi.date().allow(null).required(),
});

module.exports = {
  InvitationNewDataSc: InvitationBaseSc.concat(IidSc),
};

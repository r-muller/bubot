const Joi = require('joi');

const IidSc = Joi.object().keys({
  iid: Joi.number().required(),
});

const InvitationBaseSc = Joi.object().keys({
  status: Joi.string().required(),
  createdOn: Joi.date().required(),
  endedOn: Joi.date().allow(null).required(),
});

const InvitationNewDataSc = InvitationBaseSc.concat(IidSc);

const InvitationWithUserNestingNewDataSc = Joi.object().keys({
  hasUser: Joi.array().items(
    Joi.object().keys({
      userUid: Joi.number().required(),
      isOwner: Joi.bool().required(),
      invitationIid: Joi.number().required(),
    }).required()
  ).required(),
}).concat(InvitationNewDataSc);

module.exports = {
  InvitationNewDataSc,
  InvitationWithUserNestingNewDataSc,
};

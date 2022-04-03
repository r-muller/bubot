/* eslint-disable max-len */
const Context = require('@bubot/utils/Context');
const Errors = require('@bubot/utils/ExceptionBuilder');
const Ruler = require('@bubot/utils/Ruler');

const UserServices = require('@bubot/api-tournament/user/user.services');

const {
  E_BAD_REQUEST_TOURNAMENT_API_INVITATION_SCHEMA,
  E_NOT_FOUND_TOURNAMENT_API_INVITATION_USER_MUST_EXIST,
  E_BAD_REQUEST_TOURNAMENT_API_INVITATION_USER_CAN_NOT_IVINT_HIMSELF,
} = require('./invitation.rules');

const {
  UserExtrefIdSc,
} = require('../$schema/user');

const {
  RankSc,
} = require('../$schema/userRank');

class Post extends Ruler {
  payloadSchema = UserExtrefIdSc;

  errorSchema = E_BAD_REQUEST_TOURNAMENT_API_INVITATION_SCHEMA;

  rules = {
    UserCanNotBeHimself(context) {
      const { payload: { extrefId }, interaction, trx } = context;

      if (Number(extrefId) === Number(interaction.user.id)) {
        throw Errors(E_BAD_REQUEST_TOURNAMENT_API_INVITATION_USER_CAN_NOT_IVINT_HIMSELF, { extrefId, himselfId: interaction.user.id });
      }

      return Promise.resolve()
        .then(() => UserServices.getByExtrefId(Context.of({ payload: { extrefId: interaction.user.id }, trx })))
        .then(context.$$mergeAndForward('fetchedUserHimself'));
    },

    UserMustExist(context) {
      const { payload: { extrefId }, trx } = context;
      return Promise.resolve()
        .then(() => UserServices.getByExtrefId(Context.of({ payload: { extrefId }, trx })))
        .then(context.$$mergeAndForward('fetchedUser'))
        .then(() => {
          const { fetchedUser } = context;
          if (!fetchedUser) throw Errors(E_NOT_FOUND_TOURNAMENT_API_INVITATION_USER_MUST_EXIST, { extrefId });
        });
    },
  };
}

class Put extends Ruler {
  payloadSchema = UserExtrefIdSc.concat(RankSc);

  errorSchema = E_BAD_REQUEST_TOURNAMENT_API_INVITATION_SCHEMA;

  rules = {
    UserMustExist(context) {
      const { payload: { extrefId }, trx } = context;
      return Promise.resolve()
        .then(() => UserServices.getByExtrefId(Context.of({ payload: { extrefId }, trx })))
        .then(context.$$mergeAndForward('fetchedUser'))
        .then(() => {
          const { fetchedUser } = context;
          if (!fetchedUser) throw Errors(E_NOT_FOUND_TOURNAMENT_API_INVITATION_USER_MUST_EXIST, { extrefId });
        });
    },
  };
}

module.exports = {
  Post,
  Put,
};

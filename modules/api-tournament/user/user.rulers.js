/* eslint-disable max-len */
const Context = require('@bubot/utils/Context');
const Errors = require('@bubot/utils/ExceptionBuilder');
const Ruler = require('@bubot/utils/Ruler');
const UserServices = require('./user.services');

const {
  E_BAD_REQUEST_TOURNAMENT_API_USER_SCHEMA,
  E_NOT_FOUND_TOURNAMENT_API_USER_USER_MUST_EXIST,
} = require('./user.rules');

const {
  UserExtrefIdSc,
  UserBaseSc,
} = require('../$schema/user');

const {
  RankSc,
} = require('../$schema/userRank');

class Post extends Ruler {
  payloadSchema = UserBaseSc;

  errorSchema = E_BAD_REQUEST_TOURNAMENT_API_USER_SCHEMA;

  rules = {};
}

class Put extends Ruler {
  payloadSchema = UserExtrefIdSc.concat(RankSc);

  errorSchema = E_BAD_REQUEST_TOURNAMENT_API_USER_SCHEMA;

  rules = {
    UserMustExist(context) {
      const { payload: { extrefId }, trx } = context;
      return Promise.resolve()
        .then(() => UserServices.getByExtrefId(Context.of({ payload: { extrefId }, trx })))
        .then(context.$$mergeAndForward('fetchedUser'))
        .then(() => {
          const { fetchedUser } = context;
          if (!fetchedUser) throw Errors(E_NOT_FOUND_TOURNAMENT_API_USER_USER_MUST_EXIST, { extrefId });
        });
    },
  };
}

module.exports = {
  Post,
  Put,
};

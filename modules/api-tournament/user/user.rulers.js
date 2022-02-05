const Ruler = require('../../utils/Ruler');

const {
  E_BAD_REQUEST_TOURNAMENT_API_USER_SCHEMA,
} = require('./user.rules');

const {
  UserExtrefIdSc,
  UserBaseSc,
} = require('../$schema/user');

class Post extends Ruler {
  payloadSchema = UserBaseSc;

  errorSchema = E_BAD_REQUEST_TOURNAMENT_API_USER_SCHEMA;

  rules = {};
}

class Put extends Ruler {
  payloadSchema = UserExtrefIdSc;

  errorSchema = E_BAD_REQUEST_TOURNAMENT_API_USER_SCHEMA;

  rules = {};
}

module.exports = {
  Post,
  Put,
};

const {
  BadRequestError,
} = require('../../utils/ErrorsList');

const E_BAD_REQUEST_TOURNAMENT_API_USER_SCHEMA = 'E_BAD_REQUEST_TOURNAMENT_API_USER_SCHEMA';

module.exports = {
  [E_BAD_REQUEST_TOURNAMENT_API_USER_SCHEMA]: {
    errorCode: E_BAD_REQUEST_TOURNAMENT_API_USER_SCHEMA,
    errorType: BadRequestError,
    message: ({ error }) => `TournamentApiUser schema: ${error}`,
    publicMessage: () => 'Erreur technique, nous investiguons',
  },
};

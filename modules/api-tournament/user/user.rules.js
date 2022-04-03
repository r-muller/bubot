const {
  BadRequestError,
  NotFoundError,
} = require('@bubot/utils/ErrorsList');

const E_BAD_REQUEST_TOURNAMENT_API_USER_SCHEMA = 'E_BAD_REQUEST_TOURNAMENT_API_USER_SCHEMA';
const E_NOT_FOUND_TOURNAMENT_API_USER_USER_MUST_EXIST = 'E_NOT_FOUND_TOURNAMENT_API_USER_USER_MUST_EXIST';

module.exports = {
  [E_BAD_REQUEST_TOURNAMENT_API_USER_SCHEMA]: {
    errorCode: E_BAD_REQUEST_TOURNAMENT_API_USER_SCHEMA,
    errorType: BadRequestError,
    message: ({ error }) => `TournamentApiUser schema: ${error}`,
    publicMessage: () => 'Erreur technique, nous investiguons',
  },
  [E_NOT_FOUND_TOURNAMENT_API_USER_USER_MUST_EXIST]: {
    errorCode: E_NOT_FOUND_TOURNAMENT_API_USER_USER_MUST_EXIST,
    errorType: NotFoundError,
    message: ({ extrefId }) => `TournamentApiUser user with extrefId: ${extrefId} not exist`,
    publicMessage: () => 'Erreur technique, nous investiguons',
  },
};

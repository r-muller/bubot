const {
  BadRequestError,
  NotFoundError,
} = require('@bubot/utils/ErrorsList');

const E_BAD_REQUEST_TOURNAMENT_API_INVITATION_SCHEMA = 'E_BAD_REQUEST_TOURNAMENT_API_INVITATION_SCHEMA';
const E_NOT_FOUND_TOURNAMENT_API_INVITATION_USER_MUST_EXIST = 'E_NOT_FOUND_TOURNAMENT_API_INVITATION_USER_MUST_EXIST';
const E_BAD_REQUEST_TOURNAMENT_API_INVITATION_USER_CAN_NOT_IVINT_HIMSELF = 'E_BAD_REQUEST_TOURNAMENT_API_INVITATION_USER_CAN_NOT_IVINT_HIMSELF';

module.exports = {
  [E_BAD_REQUEST_TOURNAMENT_API_INVITATION_SCHEMA]: {
    errorCode: E_BAD_REQUEST_TOURNAMENT_API_INVITATION_SCHEMA,
    errorType: BadRequestError,
    message: ({ error }) => `TournamentApiInvitation schema: ${error}`,
    publicMessage: () => 'Erreur technique, nous investiguons',
  },
  [E_NOT_FOUND_TOURNAMENT_API_INVITATION_USER_MUST_EXIST]: {
    errorCode: E_NOT_FOUND_TOURNAMENT_API_INVITATION_USER_MUST_EXIST,
    errorType: NotFoundError,
    message: ({ extrefId }) => `TournamentApiInvitation user with extrefId: ${extrefId} not exist`,
    publicMessage: () => 'Erreur technique, nous investiguons',
  },
  [E_BAD_REQUEST_TOURNAMENT_API_INVITATION_USER_CAN_NOT_IVINT_HIMSELF]: {
    errorCode: E_BAD_REQUEST_TOURNAMENT_API_INVITATION_USER_CAN_NOT_IVINT_HIMSELF,
    errorType: BadRequestError,
    message: ({ extrefId, himselfId }) => `TournamentApiInvitation user(${extrefId}) can not invit himself(${himselfId})`,
    publicMessage: () => 'Erreur technique, nous investiguons',
  },
};

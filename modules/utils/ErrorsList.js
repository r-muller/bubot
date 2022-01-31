/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */

class ErrorGenerator extends Error {
  constructor(message, status = 500, severity) {
    super();
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message || 'Non specified Error';

    this.status = status;

    this.severity = severity;

    // this.stack = stack;
  }
}

class Prefix extends ErrorGenerator {
  constructor(message) {
    super(message || 'BadRequest', 400, 'critic');
  }
}

class BadRequestError extends ErrorGenerator {
  constructor(message) {
    super(message || 'BadRequest', 400, 'critic');
  }
}

/**
 * @class UnauthorizedError
 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated".
 * That is, the client must authenticate itself to get the requested response.
 */
class UnauthorizedError extends ErrorGenerator {
  constructor(message) {
    super(message || 'Unauthorized', 401, 'critic');
  }
}

/**
 * @class ForbiddenError
 * The client does not have access rights to the content;
 * that is, it is unauthorized, so the server is refusing to give the requested resource.
 * Unlike 401, the client's identity is known to the server.
 */
class ForbiddenError extends ErrorGenerator {
  constructor(message) {
    super(message || 'Forbidden', 403, 'critic');
  }
}
class NotFoundError extends ErrorGenerator {
  constructor(message) {
    super(message || 'NotFound', 404, 'critic');
  }
}

class NotAllowedError extends ErrorGenerator {
  constructor(message) {
    super(message || 'NotAllowed', 405, 'critic');
  }
}

class ConflictError extends ErrorGenerator {
  constructor(message) {
    super(message || 'Conflict', 409, 'critic');
  }
}

class UnprocessableError extends ErrorGenerator {
  constructor(message) {
    super(message || 'Unprocessable', 422, 'critic');
  }
}

class RequiredRessourceMissingError extends ErrorGenerator {
  constructor(message) {
    super(message || 'RequiredRessourceMissing', 477, 'critic');
  }
}

class CriticalExecError extends ErrorGenerator {
  constructor(message) {
    super(message || 'Something that happend shouldn\'t happen', 666, 'critic');
  }
}

class FailedExecError extends ErrorGenerator {
  constructor(message) {
    super(message || 'Something that happend shouldn\'t happen', 400, 'info');
  }
}
class ExternalError extends ErrorGenerator {
  constructor(message, statusCode) {
    super(message || 'Something that happend shouldn\'t happen', statusCode || 500, 'critic');
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  RequiredRessourceMissingError,
  CriticalExecError,
  ExternalError,
  FailedExecError,
  NotAllowedError,
  NotFoundError,
  UnprocessableError,
  Prefix,
};

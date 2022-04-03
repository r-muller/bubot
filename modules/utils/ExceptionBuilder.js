/* eslint-disable max-len */
const Log = require('debug-level')('errors');

module.exports = (e, details) => {
  // console.log('🚀 ~ file: ExceptionBuilder.js ~ line 4 ~ e', e);
  // const error = typeof e === 'function' ? e(details) : e;
  // console.log('🚀 ~ file: ExceptionBuilder.js ~ line 6 ~ error', error);
  const {
    errorCode,
    message,
    errorType: ClassError,
    // publicMessage,
  } = e;

  // console.log('🚀 ~ file: ExceptionBuilder.js ~ line 15 ~ message', message(details));
  // console.log('🚀 ~ file: ExceptionBuilder.js ~ line 16 ~ new (ClassError)(errorCode)', new (ClassError)(errorCode));

  const exception = new ClassError(message(details));
  // const exception = new ClassError(errorCode);
  Log.info(errorCode, exception);

  throw exception;
};

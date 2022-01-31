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
  Log.info(`[${errorCode}]: ${message(details)}`);

  throw new (ClassError)(errorCode);
};

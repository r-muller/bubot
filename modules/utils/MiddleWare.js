const { Model } = require('objection');
const DelayedResponse = require('./delayedResponse');

function noMW() {
  return context => context;
}

function ReqParamsMW({ useTrx = false } = {}) {
  return (context, endpoint) => {
    const { uri } = context;
    const { uri: route } = endpoint;

    const reqParams = {};
    const routeParams = route.split('/');
    const uriParams = uri.split('/');

    routeParams.forEach((param, index) => {
      if (param.substring(0, 1) === ':') {
        const key = param.substring(1, param.length);
        reqParams[key] = uriParams[index];
      }
    });

    if (useTrx) {
      return Model.startTransaction()
        .then((trx) => {
          context.$$mergeContext({ hasTrx: true, trx });
        });
    }

    context.$$mergeContext({ reqParams });
    return context;
  };
}

module.exports = {
  noMW,
  ReqParamsMW,
};

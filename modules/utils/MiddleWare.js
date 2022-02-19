const { Model } = require('objection');
// const DelayedResponse = require('./delayedResponse');

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

    console.log('🚀 ~ file: MiddleWare.js ~ line 32 ~ return ~ Model', Model);
    if (useTrx) {
      console.log('@todo: trx transaction for best security');
      // return Promise.resolve()
      //   .then(() => Model.startTransaction())
      //   .then((trx) => {
      //     console.log('🚀 ~ file: MiddleWare.js ~ line 32 ~ return ~ context', context);
      //     context.$$mergeContext({ reqParams, hasTrx: true, trx });
      //     return context;
      //   });
    }

    context.$$mergeContext({ reqParams });
    return context;
  };
}

module.exports = {
  noMW,
  ReqParamsMW,
};

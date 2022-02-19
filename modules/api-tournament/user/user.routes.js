const Router = require('@bubot/utils/Router');
const { ReqParamsMW } = require('@bubot/utils/MiddleWare');

const UserControllers = require('./user.controllers');
const UserResponses = require('./user.responses');

const routes = new Router('routerApiTounamentUser');

/**
 * t:user add :extrefId
 */
routes.add('/user/add/:extrefId', ReqParamsMW({ useTrx: true }), (context) => {
  console.log('🚀 ~ file: user.routes.js ~ line 24 ~ routes.add ~ context', context.reqParams);

  return Promise.resolve()
    .then(() => UserControllers.create(context))
    .then(newData => UserResponses.create(context, newData))
    .catch((e) => {
      console.log('🚀 ~ file: user.routes.js ~ line 43 ~ routes.add ~ e', e);
    });
});

/**
 * t:user add :extrefId rank :rank
 */
routes.add('/user/update/:extrefId/rank/:rank', ReqParamsMW({ useTrx: true }), (context) => {
  console.log('🚀 ~ file: user.routes.js ~ line 50 ~ routes.add ~ context', context.reqParams);

  return Promise.resolve()
    .then(() => UserControllers.update(context))
    .then(newData => UserResponses.update(context, newData))
    .catch((e) => {
      console.log('🚀 ~ file: user.routes.js ~ line 71 ~ routes.update ~ e', e);
    });
});

module.exports = routes.dispatch();

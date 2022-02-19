const Router = require('@bubot/utils/Router');
const { ReqParamsMW } = require('@bubot/utils/MiddleWare');

const InvitationControllers = require('./invitation.controllers');

const routes = new Router('routerApiTounamentInvitation');

/**
 * t:invite :extrefId
 */
routes.add('/invit/:extrefId', ReqParamsMW({ useTrx: true }), (context) => {
  console.log('🚀 ~ file: user.routes.js ~ line 24 ~ routes.add ~ context', context.reqParams);

  return Promise.resolve()
    .then(() => InvitationControllers.create(context))
    .then((newData) => {
      console.log('🚀 ~ file: user.routes.js ~ line 40 ~ .then ~ newData', newData);
    })
    .catch((e) => {
      console.log('🚀 ~ file: user.routes.js ~ line 43 ~ routes.add ~ e', e);
    });
});

/**
 * t:invite :iid :answer
 */
routes.add('/invite/:iid/:extrefId', ReqParamsMW({ useTrx: true }), (context) => {
  console.log('🚀 ~ file: user.routes.js ~ line 50 ~ routes.add ~ context', context.reqParams);

  return Promise.resolve()
    .then(() => InvitationControllers.update(context))
    .then((newData) => {
      console.log('🚀 ~ file: user.routes.js ~ line 68 ~ .then ~ newData', newData);
    })
    .catch((e) => {
      console.log('🚀 ~ file: user.routes.js ~ line 71 ~ routes.update ~ e', e);
    });
});

module.exports = routes.dispatch();

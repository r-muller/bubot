const Router = require('../../utils/Router');
const { noMW } = require('../../utils/MiddleWare');
const dispatcher = require('../dispatcher');

const routes = new Router('routerApiTounamentUser');

/**
 * @todo create Payload in this MW
 */
function ContextMW() {
  return () => {

  };
}

routes.add('/user/add', ContextMW(), (context) => {
  console.log('🚀 ~ file: user.routes.js ~ line 11 ~ routes.add ~ context', context);
});

routes.add('/user/update', noMW(), (context) => {
  console.log('🚀 ~ file: user.routes.js ~ line 15 ~ routes.update ~ context', context);
});

module.exports = routes.dispatch(dispatcher);

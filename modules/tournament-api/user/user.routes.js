const Router = require('../../utils/Router');
const dispatcher = require('../dispatcher');

const routes = new Router('routerApiTounamentUser');

function noMW() {
  return context => context;
}

routes.add('/user/add', noMW(), (context) => {
  console.log('🚀 ~ file: user.routes.js ~ line 11 ~ routes.add ~ context', context);
});

routes.add('/user/update', noMW(), (context) => {
  console.log('🚀 ~ file: user.routes.js ~ line 15 ~ routes.update ~ context', context);
});

module.exports = routes.dispatch(dispatcher);

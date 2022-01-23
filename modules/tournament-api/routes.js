/* eslint-disable no-multi-spaces */
const Router = require('../utils/Router');
const dispatcher = require('./dispatcher');

const routes = new Router('routerApiTounament');

function noMW() {
  return context => context;
}

routes.add('/user',   noMW(),   require('./user/user.routes'));

module.exports = routes.dispatch(dispatcher);

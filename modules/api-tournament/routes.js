/* eslint-disable no-multi-spaces */
const Router = require('../utils/Router');
const { noMW } = require('../utils/MiddleWare');

const routes = new Router('routerApiTounament');

routes.add('/user',   noMW(),   require('./user/user.routes'));

module.exports = routes.dispatch();

/* eslint-disable no-multi-spaces */
const Router = require('../utils/Router');

const routes = new Router('routerApiMessage');

function commandeContextMW() {
  return (context) => {
    const { content } = context;
    const args = content.substring(2).split(' ');
    const commande = args.shift();

    return context.$$mergeContext({ args, commande });
  };
}

function noMW() {
  return context => context;
}

routes.add('/commande',     commandeContextMW(),    require('../message-api/commands')());
routes.add('/message',      noMW(),                 require('../message-api/reactions')());

routes.add('/tournament',   commandeContextMW(),    require('../tournament-api/routes'));

module.exports = routes;

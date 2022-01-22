const Router = require('../utils/Router');

const api = new Router('routerApiMessage');

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

api.add('/commande', commandeContextMW(), require('./commands')());

api.add('/message', noMW(), require('./reactions')());

module.exports = api;

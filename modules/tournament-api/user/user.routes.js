const Router = require('../../utils/Router');
const { noMW } = require('../../utils/MiddleWare');
// const dispatcher = require('../dispatcher');

const routes = new Router('routerApiTounamentUser');

/**
 * @todo create Payload in this MW
 */
function ContextMW() {
  return (context, endpoint) => {
    const { uri } = context;
    const { uri: route } = endpoint;
    console.log('🚀 ~ file: user.routes.js ~ line 12 ~ return ~ uri, route', uri, route);

    const payload = {};
    const routeParams = route.split('/');
    const uriParams = uri.split('/');

    routeParams.forEach((param, index) => {
      if (param.substring(0, 1) === ':') {
        const key = param.substring(1, param.length);
        payload[key] = uriParams[index];
      }
    });

    /**
     * @todo recuper les mentions dans
     * const { reactions: { message: { mentions } } } = context;
     *
     * pour connaitre le username et le discriminator de l'extrefId passé a la route
     * cette fonction auras aussi le role de "ruler" car elle pourras throw des erreurs
     */

    context.$$mergeContext({ payload });
    return context;
  };
}

/**
 * t:user add :extrefId
 */
routes.add('/user/add/:extrefId', ContextMW(), (context) => {
  const { payload } = context;
  console.log('🚀 ~ file: user.routes.js ~ line 33 ~ routes.add ~ payload', payload);
});

/**
 * t:user add :extrefId rank :rank
 */
routes.add('/user/update/:extrefId/rank/:rank', ContextMW(), (context) => {
  const { payload } = context;
  console.log('🚀 ~ file: user.routes.js ~ line 37 ~ routes.add ~ context', context.reactions.message.mentions);
  console.log('🚀 ~ file: user.routes.js ~ line 37 ~ routes.update ~ payload', payload);
});

module.exports = routes.dispatch();

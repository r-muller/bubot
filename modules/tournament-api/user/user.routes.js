const Router = require('../../utils/Router');

const routes = new Router('routerApiTounamentUser');

const { ReqParamsMW } = require('../../utils/MiddleWare');

const UserControllers = require('./user.controllers');

const getUsersMentioned = (context) => {
  const { reactions: { message } } = context;
  if (!message) throw Error('No reactions in context');
  if (!message.mentions) throw Error('No mentions in context');
  if (!message.mentions.users) throw Error('No users in context');

  const { mentions: { users } } = context;
  return users;
};

/**
 * t:user add :extrefId
 */
routes.add('/user/add/:extrefId', ReqParamsMW({ useTrx: true }), (context) => {
  const { reqParams } = context;

  return Promise.resolve()
    .then(() => {
      const users = getUsersMentioned(context);

      const user = users.find(({ id }) => id === reqParams.extrefId.match(/\d+/g)[0]);
      const { username, discriminator } = user;
      return {
        ...reqParams,
        username,
        discriminator,
      };
    })
    .then(context.$$mergeAndForward('payload'))
    .then(() => UserControllers.create(context))
    .then((newData) => {
      console.log('🚀 ~ file: user.routes.js ~ line 40 ~ .then ~ newData', newData);
    })
    .catch((e) => {
      console.log('🚀 ~ file: user.routes.js ~ line 43 ~ routes.add ~ e', e);
    });
});

/**
 * t:user add :extrefId rank :rank
 */
routes.add('/user/update/:extrefId/rank/:rank', ReqParamsMW({ useTrx: true }), (context) => {
  const { reqParams } = context;

  return Promise.resolve()
    .then(() => {
      const users = getUsersMentioned(context);

      const user = users.find(({ id }) => id === reqParams.extrefId.match(/\d+/g)[0]);
      const { username, discriminator } = user;
      return {
        ...reqParams,
        username,
        discriminator,
      };
    })
    .then(context.$$mergeAndForward('payload'))
    .then(() => UserControllers.update(context))
    .then((newData) => {
      console.log('🚀 ~ file: user.routes.js ~ line 68 ~ .then ~ newData', newData);
    })
    .catch((e) => {
      console.log('🚀 ~ file: user.routes.js ~ line 71 ~ routes.update ~ e', e);
    });
});

module.exports = routes.dispatch();

const Context = require('../utils/Context');

module.exports = (context) => {
  const { uri, ...payload } = context.$$context;
  const { commande, args } = payload;

  const params = args.length
    ? args.reduce((acc, arg) => {
      // eslint-disable-next-line no-param-reassign
      acc += `/${arg}`;
      return acc;
    }, '')
    : '';

  const newUri = `/${commande}${params}`;
  return Context.of({ uri: newUri, ...payload });
};

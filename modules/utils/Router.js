const Context = require('./Context');

module.exports = class Router {
  routes = [];

  currentRoot = '';

  constructor(name) {
    this.name = name;
  }

  redirect = (middleware, router) => {
    if (typeof middleware !== 'function') throw new TypeError('typeof middleware must be a function');
    if (typeof router !== 'object') throw new TypeError('typeof router must be a object (class Router)');

    return (...args) => {
      const context = middleware(Context.of({ ...args[0] }));

      if (!context) return undefined;
      return router.init(context);
    };
  }

  add = (uri, middleware, callback) => {
    if (!uri || !middleware || !callback) throw new Error('uri, middleware or callback must be given');

    if (typeof uri !== 'string') throw new TypeError('typeof uri must be a string');
    if (typeof middleware !== 'function') throw new TypeError('typeof middleware must be a function');
    if (typeof callback !== 'function') throw new TypeError('typeof callback must be a function');

    this.routes.forEach((route) => {
      if (route.uri === uri) throw new Error(`the uri ${route.uri} already exists`);
    });

    const route = {
      uri,
      middleware,
      callback,
    };
    this.routes.push(route);
  }

  init = (context) => {
    const { route: { uri } } = context;

    const route = this.routes.find(localRoute => localRoute.uri === uri);

    if (!route) return undefined;

    const newContext = route.middleware.call(this, context);
    return route.callback.call(this, newContext);
  }
};

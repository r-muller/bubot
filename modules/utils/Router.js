/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
const Context = require('./Context');

const internals = {
  searchBiggestRoute: (routes, uri, index = 0) => {
    if (!routes) throw new Error('No routes give');

    const uriParams = uri.split('/');
    uriParams.shift();

    if (routes.length === 1) return routes[0];
    if (routes.length === 0) return null;
    if (uriParams.length < index) throw Error('Number of index checked params gretter than params');

    const matchRoutes = routes.filter(({ uri: route }) => {
      const routeParams = route.split('/');
      routeParams.shift();

      if (routeParams.length < index) throw Error(`Route(${route}) is too short, or an other in the same file is too big`);

      return internals.compareUriAndRouteParams(routeParams[index], uriParams[index]);
    });

    index += 1;
    return internals.searchBiggestRoute(matchRoutes, uri, index);
  },

  compareUriAndRouteParams: (uriParam, routeParam) => {
    if (routeParam.substring(0, 1) === ':' && uriParam) return true;
    if (routeParam !== uriParam) return false;
    return true;
  },
};

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
    const { uri } = context;
    if (typeof uri !== 'string') throw new TypeError(`typeof uri must be a string actual(${typeof uri})`);

    const localRoute = internals.searchBiggestRoute(this.routes, uri);

    if (!localRoute) throw Error(`No route found for uri(${uri})`);

    const payload = internals.createPayload(localRoute, uri);
    const newContext = localRoute.middleware.call(this, context);
    return localRoute.callback.call(this, newContext);
  }

  dispatch = (dispatcher) => {
    if (typeof dispatcher !== 'function') throw new TypeError('typeof middleware must be a function');

    return (context) => {
      const newContext = dispatcher.call(this, context);
      return this.init(newContext);
    };
  }
};

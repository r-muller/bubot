const { promisify } = require('util');
const pm2Package = require('pm2');

const {
  SERVER_PROTO = 'http',
  SERVER_HOST = 'localhost',
  SERVER_PORT = 8888,
  SERVER_PREFIX = '/api',
} = process.env;

/**
 * Configured axios client for clark-ws with rudimentary cookies handling
 * @module http
 */
const http = (function(axios) {
  /**
   * @private {object} where cookies are persisted
   */
  let store = {};

  /**
   * Adds REPORT verb to axios api
   * @param   {String}                     url    target url
   * @param   {object}                     config request config
   * @returns {Promise<AxiosHttpResponse>}
   */
  axios.report = (url, config = {}) => http.request({ ...config, method: 'REPORT', url });

  /**
   * Writes saved cookies has request header
   * @callback CookieRequestInterceptor
   * @param    {object}                 config request config
   * @returns  {object}                        request config
   */
  axios.interceptors.request.use((config) => {
    const cookie = Object.entries(store)
      .reduce((acc, [key, value]) => ([...acc, `${key}=${value}`]), [])
      .join('; ');

    return {
      ...config,
      headers: {
        ...config.headers,
        cookie,
      },
    };
  });

  /**
   * Saves coockies for later use
   * @callback CookieResponseInterceptor
   * @param    {AxiosHttpResponse}       response request response
   * @returns  {AxiosHttpResponse}                request response
   */
  axios.interceptors.response.use((response) => {
    const { headers: { 'set-cookie': setCookie } } = response;

    if (Array.isArray(setCookie)) {
      store = setCookie.reduce((st, cookie) => {
        const [data] = cookie.trim().split(/;\s*/);
        const [key, val] = data.split('=');

        return { ...st, [key]: val };
      }, store);
    }

    return response;
  });

  return axios;
})(require('axios').create({
  baseURL: `${SERVER_PROTO}://${SERVER_HOST}:${SERVER_PORT}${SERVER_PREFIX}`,
}));

/**
 * promisified PM2 interface
 * @module pm2
 */
const pm2 = ['connect', 'start', 'stop', 'list', 'delete', 'disconnect'].reduce((acc, method) => ({
  ...acc,
  [method]: promisify(pm2Package[method].bind(pm2Package)),
}), {
  stopAll: ({ apps }) => Promise.all(apps.map(({ name }) => pm2.stop(name))),
  safeDelete: name => pm2.delete(name).catch(err => {
    if (err.message !== 'process or namespace not found') return Promise.reject(err);
  }),
  safeDeleteAll: ({ apps }) => Promise.all(apps.map(({ name }) => pm2.safeDelete(name))),
});

/**
 * @typedef  GroupedResponse
 * @property {Array<any>}     data     responses data
 * @property {Array<Integer>} statuses responses statuses
 */

/**
 * Separates array of response in grouped arrays of data and statuses
 * @param   {AxiosHttpResponse} ar input axios responses
 * @returns {GroupedResponse}
 */
const groupResponses = ar => ar.reduce((acc, { status, data }) => {
  acc.data.push(data);
  acc.statuses.push(status);
  return acc;
}, { data: [], statuses: [] });

module.exports = {
  http,
  pm2,
  groupResponses,
};

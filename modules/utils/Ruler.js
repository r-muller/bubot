const debug = require('debug-level')('ruler');
const Joi = require('joi');

const Errors = require('./ExceptionBuilder');

const chaining = ({ instance, chainPromise }, rule) => ({
  instance,
  chainPromise: chainPromise
    .then(() => rule.call(instance, instance.context)),
  // .then(ctxt => ctxt && instance.context.$$mergeContext(ctxt));
});
class Ruler {
  constructor(context) {
    this.context = context;
    this.session = context.sessionData;
  }

  static validate(context) {
    const instance = new this(context);

    // eslint-disable-next-line no-use-before-define
    const evalRuler = rulerSchema.validate(instance);

    if (evalRuler.error) Promise.reject(evalRuler.error);

    let chainPromise = Promise.resolve();

    chainPromise = instance.payloadSchema &&
      typeof instance.payloadSchema.validate === 'function'
      ? chainPromise.then(() => instance.validatePayload())
      : chainPromise;

    chainPromise = instance.querySchema &&
      typeof instance.querySchema.validate === 'function'
      ? chainPromise.then(() => instance.validateQuery())
      : chainPromise;

    chainPromise = instance.rightModel &&
      typeof instance.rightModel === 'string'
      ? chainPromise.then(() => instance.validateRight())
      : chainPromise;

    let chainedContext = { chainPromise, instance };

    chainedContext = Object.values(instance.beforeRules || {}).reduce(chaining, chainedContext);
    chainedContext = Object.values(instance.rules || {}).reduce(chaining, chainedContext);
    chainedContext = Object.values(instance.rights || {}).reduce(chaining, chainedContext);

    return chainedContext.chainPromise;
  }

  chainRules([rule, ...rest]) {
    debug.debug(rule.name);

    const ruleResponse = rule.call(this, this.context);

    if (rest.length === 0) return ruleResponse;

    if (ruleResponse && ruleResponse.then) {
      return ruleResponse
        .then(() => this.chainRules(rest));
    }
    return Promise.resolve()
      .then(() => this.chainRules(rest));
  }

  validatePayload() {
    const ret = this.payloadSchema.validate(this.context.payload);
    if (ret.error) {
      debug.info(ret.error);
      throw Errors(this.errorSchema, ret);
    }
  }

  validateQuery() {
    const ret = this.querySchema.validate(this.context.httpQuery);
    if (ret.error) {
      debug.info(ret.error);
      throw Errors(this.errorSchema, ret);
    }
  }

  validateRight() {
    if (!this.context?.session?.rights) {
      throw new Error('No session or rights found !');
    }
    const { rights } = this.context.session;
    const right = rights[this.rightModel];
    if (!right) {
      throw Errors(this.errorRight, { right: this.rightModel });
    }
  }
}

const rulerSchema = Joi.object({
  querySchema: Joi.object().schema(),
  payloadSchema: Joi.object().schema(),
  rightModel: Joi.string(),
  errorSchema: Joi.object(),
  errorRight: Joi.object(),
  context: Joi.object(),
  session: Joi.object(),
  payload: Joi.object(),
  httpQuery: Joi.object(),
  validatePayload: Joi.function(),
  validateQuery: Joi.function(),
  chainRules: Joi.function(),
  // validateRights: Joi.function(),
  beforeRules: Joi.object().pattern(Joi.string(), Joi.function()),
  rules: Joi.object().pattern(Joi.string(), Joi.function()),
  rights: Joi.object().pattern(Joi.string(), Joi.function()),
}).instance(Ruler);

module.exports = Ruler;

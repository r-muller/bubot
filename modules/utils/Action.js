module.exports = class Action {
  constructor(context) {
    this.contextData = context;
    // this.sessionData = context.session;
  }

  static run(context) {
    const instance = new this(context);

    // eslint-disable-next-line no-use-before-define
    // const evalRuler = rulerSchema.validate(instance);

    let chainPromise = Promise.resolve();

    chainPromise = instance.action
      ? chainPromise.then(() => instance.execAction())
      : chainPromise;

    return chainPromise;
  }

  context() {
    return this.contextData;
  }

  execAction([setup, ...rest] = Object.values(this.action)) {
    const setupResponse = setup.call(this, this.payload);

    if (!rest.length > 0) return setupResponse;
    if (setupResponse && setupResponse.then) return setupResponse.then(() => this.execAction(rest));

    return Promise.resolve()
      .then(() => this.execAction(rest));
  }
};

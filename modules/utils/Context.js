const inspect = Symbol.for('nodejs.util.inspect.custom');

const internals = {
  /**
   * [mapImmutable description]
   * @method mapImmutable
   * @param  {[type]}     obj       [description]
   * @param  {Object}     [base={}] [description]
   * @return {[type]}               [description]
   */
  mapImmutable(obj, base = {}) {
    return Object.keys(obj).reduce(
      (acc, key) => {
        if (key in acc) throw new Error(internals.propExistsError(key));

        const descriptor = { configurable: false, enumerable: true };
        const oldDescriptor = Object.getOwnPropertyDescriptor(obj, key);
        // Keep getters instead of computed value
        if (oldDescriptor.get) {
          descriptor.get = oldDescriptor.get;
        } else if (oldDescriptor.value !== undefined) {
          descriptor.value = oldDescriptor.value;
          descriptor.writable = false;
        }
        // Setters are not kept since we force writable to false
        // Adding a set() prop + writable: false will throw an error

        // Return descriptors map
        return ({ ...acc, [key]: descriptor });
      },
      base
    );
  },

  proxyHandler: {
    // apply() { },     // not a function, no handling
    // construct() { }, // not a constructor, no handling
    defineProperty() { throw new Error(internals.immutableError('defineProperty')); },
    deleteProperty() { throw new Error(internals.immutableError('deleteProperty')); },

    get(contextInstance, propKey) {
      return (
        propKey.slice(0, 2) === '$$'
          ? contextInstance[propKey]
          : contextInstance.$$context[propKey]
      );
    },

    getOwnPropertyDescriptor(contextInstance, propKey) {
      // Returns only for instance props, constructor props and methods
      // are never returned by native Object.getOwnPropertyDescriptor.
      // Here we emulate the behavior as if the context's
      // data was instance specific so we do not list Context.$$ methods
      return Object.getOwnPropertyDescriptor(contextInstance.$$context, propKey);
    },

    // getPrototypeOf() { }, // no trap, default behavior matches expectations
    has(contextInstance, propKey) {
      return (
        propKey.slice(0, 2) === '$$'
          ? propKey in contextInstance
          : propKey in contextInstance.$$context
      );
    },

    isExtensible() { return false; },

    ownKeys(contextInstance) {
      // Returns only for instance props, constructor props and methods
      // are never returned by native Object.getOwnPropertyDescriptor.
      // Here we emulate the behavior as if the context's
      // data was instance specific so we do not list Context.$$ methods
      return Reflect.ownKeys(contextInstance.$$context);
    },

    preventExtensions() { throw new Error(internals.immutableError('preventExtension')); },

    set() { throw new Error(internals.immutableError('set')); },

    setPrototypeOf() { throw new Error(internals.immutableError('setPrototypeOf')); },
  },

  immutableError(type) {
    return `Cannot apply '${type}' operation on context because it is immutable.`;
  },

  propExistsError(key) {
    return `Cannont override context property ${key} because context is immutable`;
  },
};

/**
 * [Context description]
 */
class Context {
  /**
   * [of description]
   * @method of
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */
  static of(...args) {
    return new Context(...args);
  }

  /**
   * @method constructor
   * @param  {Object}    [intialContext={}]
   */
  constructor(intialContext = {}) {
    const selfProxy = new Proxy(this, internals.proxyHandler);

    Object.defineProperties(this, {
      // Allow proxy bypass
      $$self: {
        enumerable: false,
        configurable: false,
        writable: false,
        value: this,
      },
      // Real context object
      $$context: {
        enumerable: false,
        configurable: false,
        writable: true,
        value: Object.freeze(intialContext),
      },
    });

    // Force bind methods to proxy instace so they can be
    // used after destructuring and still be referencing
    // the context through 'this' instruction
    this.$$mergeContext = this.$$mergeContext.bind(selfProxy);
    this.$$clear = this.$$mergeContext.bind(selfProxy);

    return selfProxy;
  }

  /**
   * @method $$mergeContext
   * @param  {Object}       [extension={}]
   * @return {Context}
   */
  $$mergeContext(extension = {}) {
    // Prepare new descriptor object with older data to be extend
    const base = internals.mapImmutable(this.$$self.$$context);

    this.$$self.$$context = Object.freeze(
      // Create a fresh extensible object
      // Re-apply shallow freeze on properties
      // So it throws type error if we override an existing prop.
      Object.defineProperties({}, internals.mapImmutable(extension, base))
    );

    return this;
  }

  /**
   * @method $$mergeAndForward
   * @param  {String}          key
   * @return {Function}
   */
  $$mergeAndForward(key) {
    return (data) => {
      this.$$mergeContext({ [key]: data });
      return data;
    };
  }

  /**
   * [$$clear description]
   * @method $$clear
   */
  $$clear() { this.$$self.$$context = Object.freeze({}); }

  /**
   * [description]
   */
  [inspect]() { return this.$$context; }

  /**
   * @method toJSON
   * @return {Object}
   */
  toJSON() { return this.$$context; }
}

module.exports = Context;

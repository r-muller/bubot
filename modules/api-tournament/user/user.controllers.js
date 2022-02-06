const UserPayloads = require('./user.payloads');
const UserRulers = require('./user.rulers');
const UserServices = require('./user.services');

module.exports = class UserControllers {
  static create(context) {
    return Promise.resolve()
      .then(() => UserPayloads.Post(context))
      .then(() => UserRulers.Post.validate(context))
      .then(() => UserServices.create(context));
  }

  static update(context) {
    return Promise.resolve()
      .then(() => UserPayloads.Put(context))
      .then(() => UserRulers.Put.validate(context))
      .then(() => UserServices.update(context));
  }
};

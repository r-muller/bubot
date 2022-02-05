const UserRulers = require('./user.rulers');
const UserServices = require('./user.services');

module.exports = class UserControllers {
  static create(context) {
    return Promise.resolve()
      .then(() => UserRulers.Post.validate(context))
      .then(() => UserServices.create(context));
  }

  static update(context) {
    return Promise.resolve()
      .then(() => UserRulers.Put.validate(context))
      .then(() => UserServices.update(context));
  }
};

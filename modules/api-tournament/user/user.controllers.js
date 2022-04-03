const Context = require('@bubot/utils/Context');

const UserPayloads = require('./user.payloads');
const UserRulers = require('./user.rulers');
const UserServices = require('./user.services');
const UserResponses = require('./user.responses');

module.exports = class UserControllers {
  static add(context) {
    return Promise.resolve()
      .then(() => UserPayloads.Post(context))
      .then(() => UserRulers.Post.validate(context))
      .then(() => UserServices.create(context))
      .then(newData => UserResponses.create(context, newData));
  }

  static update(context) {
    return Promise.resolve()
      .then(() => UserPayloads.Put(context))
      .then(() => UserRulers.Put.validate(context))
      .then(() => {
        const { fetchedUser, payload } = context;

        const localPayload = {
          ...fetchedUser,
          userRank: {
            rank: payload.rank,
          },
        };
        return Promise.resolve()
          .then(() => UserServices.update(Context.of({ payload: localPayload })));
      })
      .then(newData => UserResponses.update(context, newData));
  }
};

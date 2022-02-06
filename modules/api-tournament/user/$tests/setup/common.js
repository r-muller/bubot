const User = require('@bubot/data-dealer/User');
const Action = require('@bubot/utils/Action');

module.exports = class Setup extends Action {
  action = {
    insertUser() {
      const context = this.context();
      const dataset = () => ({
        username: 'tournementApiUserUsername',
        discriminator: '000000',
        extrefId: '<!tournementApiUserExtrefId>',
      });

      return User.query()
        .insertAndFetch(dataset(context))
        .then(newData => context.$$mergeContext({ newData }));
    },
  }
};

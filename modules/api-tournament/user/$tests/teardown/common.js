const Action = require('@bubot/utils/Action');
const database = require('@bubot/utils/knex');

module.exports = class Teardown extends Action {
  action = {
    deleteUser() {
      const { newData: { uid } } = this.context();

      return database('user')
        .delete()
        .where('uid', uid);
    },
  }
};

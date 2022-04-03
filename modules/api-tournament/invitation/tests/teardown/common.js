const Action = require('@bubot/utils/Action');
const database = require('@bubot/utils/knex');

module.exports = class Teardown extends Action {
  action = {
    deleteInvitation() {
      const { newData: { iid } } = this.context();

      return database('invitation')
        .delete()
        .where('iid', iid);
    },
  }
};

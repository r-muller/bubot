const Action = require('../../../../utils/Action');
const database = require('../../../../utils/knex');

module.exports = class Teardown extends Action {
  action = {
    deleteUser() {
      const { newData: { uid } } = this.context();

      return database('template')
        .delete()
        .whereIn('tid', [uid]);
    },
  }
};

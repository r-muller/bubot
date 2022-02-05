const Template = require('../../../../data-dealer/User');
const Action = require('../../../../utils/Action');

module.exports = class Setup extends Action {
  action = {
    insertTemplate() {
      const context = this.context();
      const dataset = () => ({
        username: 'tournementApiUserUsername',
        discriminator: '000000',
        extrefId: '<!tournementApiUserExtrefId>',
      });

      return Template.query()
        .insertAndFetch(dataset(context))
        .then(newData => context.$$mergeContext({ newData }));
    },
  }
};

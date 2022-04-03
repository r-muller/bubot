/* eslint-disable max-len */
const { expect } = require('chai');

const Context = require('@bubot/utils/Context');

const {
  InvitationWithUserNestingNewDataSc,
} = require('@bubot/api-tournament/$schema/invitation');
const InvitationServices = require('../invitation.services');

describe.only('[Api-tournament][Services] invitations', () => {
  describe('create()', () => {
    const testContext = Context.of({});

    it('should create and return dataset', () => {
      const payload = require('./dataset/create.service')();

      return InvitationServices.create(Context.of({ payload }))
        .then((invitation) => {
          console.log('🚀 ~ file: invitations.services.test.js ~ line 15 ~ .then ~ invitation', invitation);
          expect(InvitationWithUserNestingNewDataSc.validate(invitation).error).to.be.equal(undefined);

          testContext.$$mergeContext({ newData: invitation });
        });
    });

    after(() => require('./teardown/common').run(testContext));
  });
});

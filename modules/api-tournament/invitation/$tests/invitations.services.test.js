const { expect } = require('chai');

const Context = require('@bubot/utils/Context');

const { InvitationNewDataSc } = require('@bubot/api-tournament/$schema/invitation');
const InvitationServices = require('../invitation.services');

describe('[Api-tournament][Services] invitations', () => {
  describe('create()', () => {
    it('should create and return dataset', () => {
      const payload = require('./dataset/create')();

      return InvitationServices.create(Context.of({ payload }))
        .then((invitation) => {
          expect(InvitationNewDataSc.validate(invitation).error).to.be.equal(undefined);
        });
    });
  });
});

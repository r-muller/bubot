/* eslint-disable max-len */
const { expect } = require('chai');

const Context = require('@bubot/utils/Context');

const {
  InvitationWithUserNestingNewDataSc,
} = require('@bubot/api-tournament/$schema/invitation');
const InvitationRulers = require('../invitation.rulers');

describe('[Api-tournament][Rulers] invitations', () => {
  // describe('create()', () => {
  //   it('should create and return dataset', () => {
  //     const payload = require('./dataset/create')();

  //     return InvitationRulers.Post(Context.of({ payload }))
  //       .then((invitation) => {
  //         console.log('🚀 ~ file: invitations.services.test.js ~ line 15 ~ .then ~ invitation', invitation);
  //         expect(InvitationWithUserNestingNewDataSc.validate(invitation).error).to.be.equal(undefined);
  //       });
  //   });
  // });
});

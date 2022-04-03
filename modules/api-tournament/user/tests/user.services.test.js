/* eslint-disable max-len */
const { expect } = require('chai');

const Context = require('@bubot/utils/Context');
const {
  UserNewDataSc,
  UserWithRankNestingNewDataSc,
} = require('../../$schema/user');
const UserServices = require('../user.services');

describe('[Api-tournament][Services] TournamentApiUser', () => {
  describe('report()', () => {
    const testContext = Context.of({});

    before(() => require('./setup/common').run(testContext));

    it('Should return proper dataset', () => UserServices
      .report({})
      .then((users) => {
        expect(users.length).to.be.greaterThanOrEqual(1);
        users.forEach((user) => {
          expect(UserNewDataSc.validate(user).error).to.be.equal(undefined);
        });
      }));

    it('Should return proper dataset  (with httpQuery rank)', () => UserServices
      .report({ httpQuery: { rank: 'true' } })
      .then((users) => {
        expect(users.length).to.be.greaterThanOrEqual(1);
        users.forEach((user) => {
          expect(UserWithRankNestingNewDataSc.validate(user).error).to.be.equal(undefined);
        });
      }));

    after(() => require('./teardown/common').run(testContext));
  });

  describe('getByExtrefId()', () => {
    const testContext = Context.of({});

    before(() => require('./setup/common').run(testContext));

    it('Should return proper dataset', () => UserServices
      .getByExtrefId(Context.of({ payload: { extrefId: testContext.newData.extrefId } }))
      .then((user) => {
        expect(UserNewDataSc.validate(user).error).to.be.equal(undefined);
        expect(Number(user.extrefId)).to.be.equal(Number(testContext.newData.extrefId));
      }));

    after(() => require('./teardown/common').run(testContext));
  });

  describe('create()', () => {
    const testContext = Context.of({});

    it('Should insert and return proper dataset', () => {
      const payload = require('./dataset/create')(testContext);

      return UserServices
        .create(Context.of({ payload }))
        .then(testContext.$$mergeAndForward('newData'))
        .then((user) => {
          expect(UserNewDataSc.validate(user).error).to.be.equal(undefined);
        });
    });

    after(() => require('./teardown/common').run(testContext));
  });

  describe('update()', () => {
    const testContext = Context.of({});

    before(() => require('./setup/common').run(testContext));

    it('Should update and return proper dataset', () => {
      const payload = require('./dataset/update')(testContext);

      return UserServices
        .update(Context.of({ payload }))
        .then((user) => {
          console.log('🚀 ~ file: user.services.test.js ~ line 81 ~ .then ~ user', user, user.userRank);
          expect(UserWithRankNestingNewDataSc.validate(user).error).to.be.equal(undefined);
        });
    });

    after(() => require('./teardown/common').run(testContext));
  });

  describe('delete()', () => {
    const testContext = Context.of({});

    before(() => require('./setup/common').run(testContext));

    it('Should delete and return nbr of row deleted(1)', () => UserServices
      .deleteByExtrefId(Context.of({ payload: { extrefId: testContext.newData.extrefId } }))
      .then((deletedRow) => {
        expect(deletedRow).to.be.equal(1);
      }));

    after(() => require('./teardown/common').run(testContext));
  });
});

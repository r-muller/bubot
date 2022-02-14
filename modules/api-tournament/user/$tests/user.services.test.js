/* eslint-disable max-len */
const { expect } = require('chai');

const { UserNewDataSc, UserWithRankNestingNewDataSc } = require('../../$schema/user');
const UserServices = require('../user.services');
const Context = require('../../../utils/Context');

describe('[Services] TournamentApiUser', () => {
  describe('report()', () => {
    const testContext = Context.of({});

    before(() => require('./setup/common').run(testContext));

    it('Should return proper dataset', () => UserServices
      .report({})
      .then((users) => {
        console.log('🚀 ~ file: user.services.test.js ~ line 17 ~ .then ~ users', users);
        expect(users.length).to.be.greaterThanOrEqual(1);
        users.forEach((user) => {
          console.log('🚀 ~ file: user.services.test.js ~ line 22 ~ users.forEach ~ user', user);
          expect(UserWithRankNestingNewDataSc.validate(user).error).to.be.equal(undefined);
        });
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

  // describe('update()', () => {
  //   const testContext = Context.of({});

  //   before(() => require('./setup/common').run(testContext));

  //   it('Should update and return proper dataser', () => {
  //     const payload = require('./dataset/update')(testContext);

  //     return UserServices
  //       .update(Context.of({ payload }))
  //       .then((user) => {
  //         expect(UserNewDataSc.validate(user).error).to.be.equal(undefined);
  //         expect(user.text).to.be.equal('testUpdate');
  //       });
  //   });

  //   after(() => require('./teardown/common').run(testContext));
  // });

  describe('delete()', () => {
    const testContext = Context.of({});

    before(() => require('./setup/common').run(testContext));

    it('Should delete and return nbr of row deleted(1)', () => {
      const { extrefId } = require('./dataset/update')(testContext);

      return UserServices
        .deleteByExtrefId(Context.of({ payload: { extrefId } }))
        .then((deletedRow) => {
          expect(deletedRow).to.be.equal(1);
        });
    });

    after(() => require('./teardown/common').run(testContext));
  });
});

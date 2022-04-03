const { hasProperty } = require('@bubot/utils/helpers');
const User = require('../../data-dealer/User');

module.exports = class UserServices {
  /**
   * [getByExtrefId description]
   *
   * @method getByExtrefId
   * @param  {Object} payload
   * @param  {Number} payload.extrefId
   * @param  {Object} httpQuery
   * @param  {Knex}    trx        knex transaction
   * @return {promise}
   */
  static getByExtrefId({ payload: { extrefId }, httpQuery, trx }) {
    const query = User.query(trx)
      .findOne({ extrefId });

    if (httpQuery) {
      if (hasProperty(httpQuery, 'invitation')) {
        query.withGraphJoined('[invitations]');
      }
    }

    return query;
  }

  /**
   * [report description]
   *
   * @method report
   * @param  {Object} httpQuery
   * @param  {Knex}    trx        knex transaction
   * @return {promise}
   */
  static report({ httpQuery, trx }) {
    const query = User.query(trx);

    if (httpQuery) {
      if (hasProperty(httpQuery, 'rank')) {
        query.withGraphJoined('userRank');
      }
    }

    return query;
  }

  /**
   * [create description]
   *
   * @param   {Object}     payload
   * @param   {Object}     httpQuery               [httpQuery description]
   * @param   {Knex}       trx                     [trx description]
   *
   * @return  {promise}
   */
  static create({ payload, trx }) {
    return User.query(trx)
      .insertAndFetch(payload);
  }

  /**
   * [update description]
   *
   * @param   {Object}     payload
   * @param   {Object}     httpQuery               [httpQuery description]
   * @param   {Knex}       trx                     [trx description]
   *
   * @return  {promise}
   */
  static update({ payload, trx }) {
    return User.query(trx)
      .upsertGraphAndFetch(payload);
  }

  /**
   * [deleteByExtrefId description]
   *
   * @param   {Object}     payload
   * @param   {Object}     httpQuery               [httpQuery description]
   * @param   {Knex}       trx                     [trx description]
   *
   * @return  {promise}
   */
  static deleteByExtrefId({ payload: { extrefId }, trx }) {
    return User.query(trx)
      .where('extrefId', extrefId)
      .delete();
  }
};

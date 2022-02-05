const User = require('../../data-dealer/User');

module.exports = class ContactPlatformServices {
  /**
   * [get description]
   *
   * @method get
   * @param  {Object} payload
   * @param  {Number} payload.uid
   * @param  {Knex}    trx        knex transaction
   * @return {promise}
   */
  static get({ payload: { uid }, trx }) {
    return User.query(trx)
      .findById(uid)
      .withGraphJoined('[invitations]');
  }

  /**
   * [report description]
   *
   * @method report
   * @param  {Object} httpQuery
   * @param  {Knex}    trx        knex transaction
   * @return {promise}
   */
  static report({ trx }) {
    return User.query(trx);
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
  static update({ payload: { uid, ...payload }, trx }) {
    return User.query(trx)
      .updateAndFetchById(uid, payload);
  }
};

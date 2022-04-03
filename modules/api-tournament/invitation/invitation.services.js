const Invitation = require('@bubot/data-dealer/Invitation');

module.exports = class InvitationServices {
  /**
   * [get description]
   *
   * @method get
   * @param  {Object} payload
   * @param  {Number} payload.iid
   * @param  {Knex}    trx        knex transaction
   * @return {promise}
   */
  static get({ payload: { iid }, trx }) {
    return Invitation.query(trx)
      .findById(iid);
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
    return Invitation.query(trx)
      .insertGraphAndFetch(payload, {
        insertMissing: ['hasUser'],
      });
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
  static update({ payload: { iid, ...payload }, trx }) {
    return Invitation.query(trx)
      .where('iid', iid)
      .updateAndFetch(payload);
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
  static delete({ payload: { iid }, trx }) {
    return Invitation.query(trx)
      .where('iid', iid)
      .delete();
  }
};

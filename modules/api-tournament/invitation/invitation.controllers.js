const Context = require('@bubot/utils/Context');
const moment = require('moment');

const InvitationPayloads = require('./invitation.payloads');
const InvitationRulers = require('./invitation.rulers');
const InvitationServices = require('./invitation.services');
const InvitationResponses = require('./invitation.responses');

module.exports = class InvitationControllers {
  static send(context) {
    return Promise.resolve()
      .then(() => InvitationPayloads.Post(context))
      .then(() => InvitationRulers.Post.validate(context))
      .then(() => {
        const { fetchedUser, fetchedUserHimself } = context;
        console.log('🚀 ~ file: invitation.controllers.js ~ line 23 ~ InvitationControllers ~ .then ~  fetchedUserHimself.uid', fetchedUserHimself.uid);
        console.log('🚀 ~ file: invitation.controllers.js ~ line 28 ~ InvitationControllers ~ .then ~ fetchedUser.uid', fetchedUser.uid);
        const localPayload = {
          status: 'DELIVRED',
          createdOn: moment().format(),
          endedOn: null,
          hasUser: [
            {
              userUid: fetchedUserHimself.uid,
              isOwner: true,
            },
            {
              userUid: fetchedUser.uid,
              isOwner: false,
            },
          ],
        };
        return InvitationServices.create(Context.of({ payload: localPayload }));
      })
      .then(newData => InvitationResponses.send(context, newData));
  }

  // static update(context) {
  //   return Promise.resolve()
  //     .then(() => InvitationPayloads.Put(context))
  //     .then(() => InvitationRulers.Put.validate(context))
  //     .then(() => {
  //       const { fetchedInvitation, payload } = context;

  //       const localPayload = {
  //         ...fetchedInvitation,
  //         invitationRank: {
  //           rank: payload.rank,
  //         },
  //       };
  //       return Promise.resolve()
  //         .then(() => InvitationServices.update(Context.of({ payload: localPayload })));
  //     })
  //     .then(newData => InvitationResponses.update(context, newData));
  // }
};

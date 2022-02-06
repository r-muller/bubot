
const getUsersMentionedInContext = (context) => {
  const { reactions: { message } } = context;
  if (!message) throw Error('No reactions in context');
  if (!message.mentions) throw Error('No mentions in context');
  if (!message.mentions.users) throw Error('No users in context');

  const { mentions: { users } } = context;
  return users;
};

const findUserByExtrefId = (users, extrefId) => users.find(({ id }) => id === extrefId.match(/\d+/g)[0]);

module.exports = {
  getUsersMentionedInContext,
  findUserByExtrefId,
};

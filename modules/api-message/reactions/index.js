const {
  contextUserMention,
} = require('@bubot/utils/MessageBuilder');

const reactions = () => (context) => {
  // if (isBotMessage(context)) sendWandre(context);
  sendWandre(context);
};

const isBotMessage = ({ author }) => Boolean(author.bot);

const sendWandre = (context) => {
  const { reactions: { message } } = context;
  message.channel.send(wandreSentences(context, Math.floor(Math.random() * (9 - 0) + 0)));
};

function wandreSentences(context, random) {
  switch (random) {
    case 0:
      return (`Why do u talk so much ${contextUserMention(context)} :o`);
    case 1:
      return (`${contextUserMention(context)} pffffff`);
    case 2:
      return (`${contextUserMention(context)} no comment.`);
    case 3:
      return (`plz ${contextUserMention(context)} :(`);
    case 4:
      return (`${contextUserMention(context)} need a pro tip? be smart !`);
    case 5:
      return (`${contextUserMention(context)} le pion de fac`);
    case 6:
      return (`${contextUserMention(context)} petit empoilé...`);
    case 7:
      return (`${contextUserMention(context)} stupide hobbit joufflu !`);
    case 8:
      return (`${contextUserMention(context)} roooo tu pues le gymnase !`);
    case 9:
      return (`${contextUserMention(context)} ton pere le chauve !`);
    default:
      return undefined;
  }
}

module.exports = reactions;

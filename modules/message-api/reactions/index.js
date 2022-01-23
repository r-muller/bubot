const {
  mentionUser,
} = require('../../utils/MessageBuilder');

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
      return (`Why do u talk so much ${mentionUser(context)} :o`);
    case 1:
      return (`${mentionUser(context)} pffffff`);
    case 2:
      return (`${mentionUser(context)} no comment.`);
    case 3:
      return (`plz ${mentionUser(context)} :(`);
    case 4:
      return (`${mentionUser(context)} need a pro tip? be smart !`);
    case 5:
      return (`${mentionUser(context)} le pion de fac`);
    case 6:
      return (`${mentionUser(context)} petit empoilé...`);
    case 7:
      return (`${mentionUser(context)} stupide hobbit joufflu !`);
    case 8:
      return (`${mentionUser(context)} roooo tu pues le gymnase !`);
    case 9:
      return (`${mentionUser(context)} ton pere le chauve !`);
    default:
      return undefined;
  }
}

module.exports = reactions;

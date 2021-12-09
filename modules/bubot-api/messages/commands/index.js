function commands() {
  return ({ commande, args }) => {
    console.log('🚀 ~ file: routes.js ~ line 8 ~ commande ~ context', commande, args);
  };
}

module.exports = commands;

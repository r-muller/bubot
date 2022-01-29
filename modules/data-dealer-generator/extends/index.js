module.exports = require('fs')
  .readdirSync(__dirname, { withFileTypes: true })
  .filter(dirent => dirent.isFile())
  .reduce((acc, { name }) => {
    const [fileName] = name.split('.');
    return { ...acc, [fileName]: require(`./${fileName}`) };
  }, {});

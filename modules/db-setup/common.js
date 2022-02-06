module.exports = ({ client, fs }) => Promise.resolve()
  .then(() => client.query(fs('insert/user')));

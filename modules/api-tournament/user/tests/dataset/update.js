module.exports = ({ newData }) => ({
  ...newData,
  userRank: {
    userUid: newData.uid,
    rank: 1000,
  },
});
